import { Alert, Stack } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AxiosError } from "axios";

import type { ProfileDetails, ProfileTimelineItem } from "../model/types";

import {
    getAuthGetUserQueryKey,
    queryClient,
    useAuthGetUser,
    useCitiesGetCities,
    useSkillsGetSkills,
    useUniversitiesGetUniversities,
} from "@shared/api";
import type { UserDTO } from "@shared/api/generated/model";
import {
    getMyPortfolioItems,
    getMyPortfolioItemsQueryKey,
    getMyProfile,
    getMyProfileQueryKey,
    getMySkills,
    getMySkillsQueryKey,
    replaceMySkills,
    updateMyProfile,
} from "@shared/api/liveApi";
import { ErrorFallback } from "@shared/ui/ErrorFallback";
import { Loader } from "@shared/ui/Loader";

import ProfileEditAdditionalSection from "./ProfileEditAdditionalSection";
import ProfileEditBasicsSection from "./ProfileEditBasicsSection";
import ProfileEditContactsSection from "./ProfileEditContactsSection";
import ProfileEditHeader from "./ProfileEditHeader";
import ProfileViewExperienceSection from "./ProfileViewExperienceSection";
import ProfileViewHeader from "./ProfileViewHeader";
import ProfileViewSidebar from "./ProfileViewSidebar";

const emptyDetails: ProfileDetails = {
    initials: "",
    fullName: "",
    city: "",
    university: "",
    bio: "",
    email: "",
    telegram: "",
    portfolio: "",
};

const emptyList: never[] = [];

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

const getFullNameParts = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);

    return {
        firstName: parts[0] || "Имя",
        lastName: parts.slice(1).join(" ") || "Фамилия",
    };
};

const formatDate = (value?: string | null) => {
    if (!value) {
        return "";
    }

    return new Intl.DateTimeFormat("ru-RU", {
        month: "long",
        year: "numeric",
    }).format(new Date(value));
};

const formatPeriod = (startedAt?: string | null, endedAt?: string | null) => {
    const start = formatDate(startedAt);
    const end = endedAt ? formatDate(endedAt) : "сейчас";

    if (!start && !endedAt) {
        return "";
    }

    if (!start) {
        return end;
    }

    return `${start} - ${end}`;
};

const normalizeSite = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
        return null;
    }

    if (/^https?:\/\//.test(trimmedValue)) {
        return trimmedValue;
    }

    return `https://${trimmedValue}`;
};

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [details, setDetails] = useState<ProfileDetails>(emptyDetails);
    const [skills, setSkills] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);
    const [status, setStatus] = useState("");
    const [timeline, setTimeline] = useState<ProfileTimelineItem[]>([]);
    const [draftDetails, setDraftDetails] =
        useState<ProfileDetails>(emptyDetails);
    const [draftSkills, setDraftSkills] = useState<string[]>([]);
    const [draftInterests, setDraftInterests] = useState<string[]>([]);
    const [draftStatus, setDraftStatus] = useState("");
    const [draftTimeline, setDraftTimeline] = useState<ProfileTimelineItem[]>(
        [],
    );
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
    } = useQuery({
        queryKey: getMyProfileQueryKey(),
        queryFn: ({ signal }) => getMyProfile(signal),
    });

    const {
        data: profileSkillsData,
        isLoading: isProfileSkillsLoading,
        error: profileSkillsError,
        refetch: refetchProfileSkills,
    } = useQuery({
        queryKey: getMySkillsQueryKey(),
        queryFn: ({ signal }) => getMySkills(signal),
    });

    const {
        data: portfolioItemsData,
        isLoading: isPortfolioLoading,
        error: portfolioError,
        refetch: refetchPortfolio,
    } = useQuery({
        queryKey: getMyPortfolioItemsQueryKey(),
        queryFn: ({ signal }) => getMyPortfolioItems(signal),
    });

    const {
        data: citiesData,
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
        data: universitiesData,
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

    const {
        data: allSkillsData,
        isLoading: isAllSkillsLoading,
        error: allSkillsError,
        refetch: refetchAllSkills,
    } = useSkillsGetSkills(
        { limit: 100 },
        {
            query: {
                staleTime: 5 * 60 * 1000,
            },
        },
    );

    const updateProfileMutation = useMutation({
        mutationFn: updateMyProfile,
    });

    const replaceSkillsMutation = useMutation({
        mutationFn: replaceMySkills,
    });

    const profileSkills = profileSkillsData ?? emptyList;
    const portfolioItems = portfolioItemsData ?? emptyList;
    const cities = citiesData ?? emptyList;
    const universities = universitiesData ?? emptyList;
    const allSkills = allSkillsData ?? emptyList;

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
            city: city?.name ?? "",
            university: university?.short_name || university?.name || "",
            bio: profile.bio ?? "",
            email: user?.email ?? "",
            telegram: profile.telegram ?? "",
            portfolio: profile.site ?? "",
        };
        const nextSkills = profileSkills.map((skill) => skill.name);
        const nextTimeline = portfolioItems.map((item) => ({
            title: item.title,
            period: formatPeriod(item.work_started_at, item.work_ended_at),
            description: item.description ?? item.team_role.name,
        }));
        const nextStatus = profile.status ?? "";

        setDetails(nextDetails);
        setSkills(nextSkills);
        setInterests([]);
        setStatus(nextStatus);
        setTimeline(nextTimeline);

        if (!isEditing) {
            setDraftDetails(nextDetails);
            setDraftSkills(nextSkills);
            setDraftInterests([]);
            setDraftStatus(nextStatus);
            setDraftTimeline(nextTimeline);
        }
    }, [
        cities,
        isEditing,
        portfolioItems,
        profile,
        profileSkills,
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

    const addSkill = () => {
        const skill = allSkills.find(
            (item) =>
                item.name.toLowerCase() === skillInput.trim().toLowerCase(),
        );

        if (!skill) {
            setSaveError("Такого навыка нет в справочнике.");
            setSkillInput("");
            return;
        }

        setSaveError("");
        addChip(skill.name, draftSkills, setDraftSkills, () =>
            setSkillInput(""),
        );
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

        const { firstName, lastName } = getFullNameParts(draftDetails.fullName);
        const city = cities.find((item) => item.name === draftDetails.city);
        const university = universities.find(
            (item) =>
                item.name === draftDetails.university ||
                item.short_name === draftDetails.university,
        );
        const skillIds = draftSkills
            .map(
                (skillName) =>
                    allSkills.find((skill) => skill.name === skillName)?.id,
            )
            .filter((skillId): skillId is string => Boolean(skillId));

        if (skillIds.length !== draftSkills.length) {
            setSaveError("Можно сохранять только навыки из справочника.");
            return;
        }

        try {
            await updateProfileMutation.mutateAsync({
                first_name: firstName,
                last_name: lastName,
                bio: draftDetails.bio.trim() || null,
                status: draftStatus.trim() || null,
                telegram: draftDetails.telegram.trim() || null,
                site: normalizeSite(draftDetails.portfolio),
                city_id: city?.id ?? profile.city_id,
                university_id: university?.id ?? profile.university_id,
            });

            const savedSkills = await replaceSkillsMutation.mutateAsync({
                skill_ids: skillIds,
            });

            await Promise.all([
                queryClient.invalidateQueries({
                    queryKey: getMyProfileQueryKey(),
                }),
                queryClient.invalidateQueries({
                    queryKey: getMySkillsQueryKey(),
                }),
                queryClient.invalidateQueries({
                    queryKey: getMyPortfolioItemsQueryKey(),
                }),
                queryClient.invalidateQueries({
                    queryKey: getAuthGetUserQueryKey(),
                }),
            ]);

            const savedFullName = `${firstName} ${lastName}`.trim();
            setDetails({
                ...draftDetails,
                initials: deriveInitials(savedFullName),
                fullName: savedFullName,
                city: city?.name ?? draftDetails.city,
                university:
                    university?.short_name ||
                    university?.name ||
                    draftDetails.university,
                portfolio: normalizeSite(draftDetails.portfolio) ?? "",
            });
            setSkills(savedSkills.map((skill) => skill.name));
            setStatus(draftStatus);
        } catch {
            setSaveError(
                "Не удалось сохранить профиль. Проверьте данные и попробуйте еще раз.",
            );
            return;
        }

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
        isProfileSkillsLoading ||
        isPortfolioLoading ||
        isCitiesLoading ||
        isUniversitiesLoading ||
        isAllSkillsLoading;
    const error =
        userError ||
        profileError ||
        profileSkillsError ||
        portfolioError ||
        citiesError ||
        universitiesError ||
        allSkillsError;

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
                    void refetchProfileSkills();
                    void refetchPortfolio();
                    void refetchCities();
                    void refetchUniversities();
                    void refetchAllSkills();
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
                    onAddSkill={addSkill}
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
                    showInterests={false}
                    showTimeline={false}
                />
            </Stack>
        );
    }

    return (
        <Stack spacing={3}>
            <ProfileViewHeader details={details} onEdit={handleEditStart} />

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
