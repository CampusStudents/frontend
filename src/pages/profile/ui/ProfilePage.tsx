import { Stack } from "@mui/material";
import { useState } from "react";

import {
    profileDetails,
    profileInterests,
    profileSkills,
    profileStats,
    profileStatus,
    profileTimeline,
} from "../model/mockData";
import type { ProfileDetails, ProfileTimelineItem } from "../model/types";

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

    const addChip = (
        value: string,
        currentItems: string[],
        setItems: React.Dispatch<React.SetStateAction<string[]>>,
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
        setItems: React.Dispatch<React.SetStateAction<string[]>>,
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

    const handleSaveEdit = () => {
        setDetails({
            ...draftDetails,
            initials: deriveInitials(draftDetails.fullName) || details.initials,
        });
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

    if (isEditing) {
        return (
            <Stack spacing={3}>
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
