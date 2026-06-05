import { Alert, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";

import {
    profileDetails,
    profileInterests,
    profileSkills,
    profileStats,
    profileStatus,
    profileTimeline,
} from "../model/mockData";
import type { ProfileDetails, ProfileTimelineItem } from "../model/types";

import {
    getAuthGetUserQueryKey,
    getUsersGetMyProfileQueryKey,
    queryClient,
    useAuthGetUser,
    useCitiesGetCities,
    useUniversitiesGetUniversities,
    useUsersGetMyProfile,
    useUsersUpdateMyProfile,
} from "@shared/api";
import type { UserDTO } from "@shared/api/generated/model";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

import ProfileEditAdditionalSection from "./ProfileEditAdditionalSection";
import ProfileEditBasicsSection from "./ProfileEditBasicsSection";
import ProfileEditContactsSection from "./ProfileEditContactsSection";
import ProfileEditHeader from "./ProfileEditHeader";
import ProfileViewExperienceSection from "./ProfileViewExperienceSection";
import ProfileViewHeader from "./ProfileViewHeader";
import ProfileViewSidebar from "./ProfileViewSidebar";

const deriveInitials = (fullName: string) =>
    fullName
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("")
        .slice(0, 2);

const createEmptyTimelineItem = (): ProfileTimelineItem => ({
    title: "",
    period: "",
    description: "",
});

const getRoleLabel = (roles?: string[]) => {
    if (!roles?.length) {
        return "Студент";
    }

    return roles[0];
};

const getFullNameParts = (fullName: string, fallback: ProfileDetails) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);
    const fallbackParts = fallback.fullName.trim().split(/\s+/).filter(Boolean);

    return {
        firstName: parts[0] || fallbackParts[0] || "Имя",
        lastName: parts.slice(1).join(" ") || fallbackParts[1] || "Фамилия",
    };
};

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [details, setDetails] = useState<ProfileDetails>(profileDetails);
    const [skills, setSkills] = useState(profileSkills);
    const [interests, setInterests] = useState(profileInterests);
    const [status, setStatus] = useState(profileStatus);
    const [timeline, setTimeline] = useState(profileTimeline);
    const [draftDetails, setDraftDetails] =
        useState<ProfileDetails>(profileDetails);
    const [draftSkills, setDraftSkills] = useState(profileSkills);
    const [draftInterests, setDraftInterests] = useState(profileInterests);
    const [draftStatus, setDraftStatus] = useState(profileStatus);
    const [draftTimeline, setDraftTimeline] = useState(profileTimeline);
    const [skillInput, setSkillInput] = useState("");
    const [interestInput, setInterestInput] = useState("");
    const [saveError, setSaveError] = useState("");

    const {
        data: user,
        isLoading: isUserLoading,
        error: userError,
        refetch: refetchUser,
    } = useAuthGetUser<UserDTO, AxiosError>();

    const {
        data: profile,
        isLoading: isProfileLoading,
        error: profileError,
        refetch: refetchProfile,
    } = useUsersGetMyProfile();

    const {
        data: cities = [],
        isLoading: isCitiesLoading,
        error: citiesError,
        refetch: refetchCities,
    } = useCitiesGetCities(
        { limit: 100 },
        {
            query: {
                staleTime: 5 * 60 * 1000,
            },
        },
    );

    const {
        data: universities = [],
        isLoading: isUniversitiesLoading,
        error: universitiesError,
        refetch: refetchUniversities,
    } = useUniversitiesGetUniversities(
        { limit: 100 },
        {
            query: {
                staleTime: 5 * 60 * 1000,
            },
        },
    );

    const updateProfileMutation = useUsersUpdateMyProfile();

    useEffect(() => {
        if (!profile) {
            return;
        }

        const city = cities.find((item) => item.id === profile.city_id);
        const university = universities.find(
            (item) => item.id === profile.university_id,
        );
        const fullName = `${profile.first_name} ${profile.last_name}`.trim();

        const nextDetails: ProfileDetails = {
            initials: deriveInitials(fullName),
            fullName,
            role: getRoleLabel(user?.roles),
            city: city?.name ?? "",
            format: profileDetails.format,
            university: university?.short_name || university?.name || "",
            bio: profile.bio ?? "",
            email: user?.email ?? "",
            telegram: details.telegram,
            portfolio: details.portfolio,
        };

        setDetails(nextDetails);

        if (!isEditing) {
            setDraftDetails(nextDetails);
        }
    }, [
        cities,
        details.portfolio,
        details.telegram,
        isEditing,
        profile,
        universities,
        user,
    ]);

    const addChip = (
        value: string,
        currentItems: string[],
        setItems: Dispatch<SetStateAction<string[]>>,
        clearInput: () => void,
    ) => {
        const trimmedValue = value.trim();

        if (!trimmedValue || currentItems.includes(trimmedValue)) {
            clearInput();
            return;
        }

        setItems((current) => [...current, trimmedValue]);
        clearInput();
    };

    const removeChip = (
        value: string,
        setItems: Dispatch<SetStateAction<string[]>>,
    ) => {
        setItems((current) => current.filter((item) => item !== value));
    };

    const handleEditStart = () => {
        setDraftDetails(details);
        setDraftSkills(skills);
        setDraftInterests(interests);
        setDraftStatus(status);
        setDraftTimeline(timeline);
        setSkillInput("");
        setInterestInput("");
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setDraftDetails(details);
        setDraftSkills(skills);
        setDraftInterests(interests);
        setDraftStatus(status);
        setDraftTimeline(timeline);
        setSkillInput("");
        setInterestInput("");
        setIsEditing(false);
    };

    const handleSaveEdit = async () => {
        if (!profile) {
            return;
        }

        setSaveError("");

        const { firstName, lastName } = getFullNameParts(
            draftDetails.fullName,
            details,
        );
        const city = cities.find((item) => item.name === draftDetails.city);
        const university = universities.find(
            (item) =>
                item.name === draftDetails.university ||
                item.short_name === draftDetails.university,
        );

        try {
            const updatedProfile = await updateProfileMutation.mutateAsync({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                    bio: draftDetails.bio.trim() || null,
                    city_id: city?.id ?? profile.city_id,
                    university_id: university?.id ?? profile.university_id,
                },
            });

            const savedFullName =
                `${updatedProfile.first_name} ${updatedProfile.last_name}`.trim();

            setDetails({
                ...draftDetails,
                initials: deriveInitials(savedFullName) || details.initials,
                fullName: savedFullName,
                city: city?.name ?? draftDetails.city,
                university:
                    university?.short_name ||
                    university?.name ||
                    draftDetails.university,
                bio: updatedProfile.bio ?? "",
            });
            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: getUsersGetMyProfileQueryKey(),
                }),
                queryClient.invalidateQueries({
                    queryKey: getAuthGetUserQueryKey(),
                }),
            ]);
        } catch {
            setSaveError(
                "Не удалось сохранить профиль. Проверьте данные и попробуйте еще раз.",
            );
            return;
        }

        setSkills(draftSkills);
        setInterests(draftInterests);
        setStatus(draftStatus);
        setTimeline(
            draftTimeline.filter((item) => item.title || item.description),
        );
        setSkillInput("");
        setInterestInput("");
        setIsEditing(false);
    };

    const handleDraftDetailsChange = (
        field: keyof ProfileDetails,
        value: string,
    ) => {
        setDraftDetails((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleTimelineItemChange = (
        index: number,
        field: keyof ProfileTimelineItem,
        value: string,
    ) => {
        setDraftTimeline((current) =>
            current.map((item, itemIndex) =>
                itemIndex === index ? { ...item, [field]: value } : item,
            ),
        );
    };

    const handleAddTimelineItem = () => {
        setDraftTimeline((current) => [...current, createEmptyTimelineItem()]);
    };

    const handleRemoveTimelineItem = (index: number) => {
        setDraftTimeline((current) =>
            current.length === 1
                ? current
                : current.filter((_, itemIndex) => itemIndex !== index),
        );
    };

    const isLoading =
        isUserLoading ||
        isProfileLoading ||
        isCitiesLoading ||
        isUniversitiesLoading;
    const error = userError || profileError || citiesError || universitiesError;

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <ErrorFallback
                title="Не удалось загрузить профиль"
                description="Профиль сейчас недоступен. Попробуйте обновить данные."
                error={error as AxiosError}
                onRetry={() => {
                    void refetchUser();
                    void refetchProfile();
                    void refetchCities();
                    void refetchUniversities();
                }}
            />
        );
    }

    if (isEditing) {
        return (
            <Stack spacing={3}>
                {saveError ? <Alert severity="error">{saveError}</Alert> : null}

                <ProfileEditHeader
                    initials={draftDetails.initials}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                />

                <Stack
                    direction={{ xs: "column", xl: "row" }}
                    spacing={3}
                    alignItems="stretch"
                >
                    <ProfileEditBasicsSection
                        details={draftDetails}
                        onDetailsChange={handleDraftDetailsChange}
                    />
                    <ProfileEditContactsSection
                        details={draftDetails}
                        status={draftStatus}
                        onDetailsChange={handleDraftDetailsChange}
                        onStatusChange={setDraftStatus}
                    />
                </Stack>

                <ProfileEditAdditionalSection
                    skills={draftSkills}
                    interests={draftInterests}
                    skillInput={skillInput}
                    interestInput={interestInput}
                    timeline={draftTimeline}
                    onSkillInputChange={setSkillInput}
                    onInterestInputChange={setInterestInput}
                    onAddSkill={() =>
                        addChip(skillInput, draftSkills, setDraftSkills, () =>
                            setSkillInput(""),
                        )
                    }
                    onAddInterest={() =>
                        addChip(
                            interestInput,
                            draftInterests,
                            setDraftInterests,
                            () => setInterestInput(""),
                        )
                    }
                    onRemoveSkill={(value) => removeChip(value, setDraftSkills)}
                    onRemoveInterest={(value) =>
                        removeChip(value, setDraftInterests)
                    }
                    onAddTimelineItem={handleAddTimelineItem}
                    onRemoveTimelineItem={handleRemoveTimelineItem}
                    onTimelineItemChange={handleTimelineItemChange}
                />
            </Stack>
        );
    }

    return (
        <Stack spacing={3}>
            <ProfileViewHeader
                details={details}
                stats={profileStats}
                onEdit={handleEditStart}
            />

            <Stack
                direction={{ xs: "column", lg: "row" }}
                spacing={3}
                alignItems="stretch"
            >
                <ProfileViewExperienceSection timeline={timeline} />
                <ProfileViewSidebar
                    skills={skills}
                    interests={interests}
                    status={status}
                />
            </Stack>
        </Stack>
    );
};

export default ProfilePage;
