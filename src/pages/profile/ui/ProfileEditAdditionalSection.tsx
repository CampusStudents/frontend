import { Divider, Paper, Stack, Typography } from "@mui/material";

import type { ProfileTimelineItem } from "../model/types";

import { profileCardSx } from "./profileCardSx";
import ProfileChipEditorSection from "./ProfileChipEditorSection";
import ProfileTimelineEditor from "./ProfileTimelineEditor";

type ProfileEditAdditionalSectionProps = {
    skills: string[];
    interests: string[];
    skillInput: string;
    interestInput: string;
    timeline: ProfileTimelineItem[];
    onSkillInputChange: (value: string) => void;
    onInterestInputChange: (value: string) => void;
    onAddSkill: () => void;
    onAddInterest: () => void;
    onRemoveSkill: (value: string) => void;
    onRemoveInterest: (value: string) => void;
    onAddTimelineItem: () => void;
    onRemoveTimelineItem: (index: number) => void;
    onTimelineItemChange: (
        index: number,
        field: keyof ProfileTimelineItem,
        value: string,
    ) => void;
};

const ProfileEditAdditionalSection = ({
    skills,
    interests,
    skillInput,
    interestInput,
    timeline,
    onSkillInputChange,
    onInterestInputChange,
    onAddSkill,
    onAddInterest,
    onRemoveSkill,
    onRemoveInterest,
    onAddTimelineItem,
    onRemoveTimelineItem,
    onTimelineItemChange,
}: ProfileEditAdditionalSectionProps) => {
    return (
        <Paper elevation={0} sx={profileCardSx}>
            <Stack spacing={3}>
                <ProfileChipEditorSection
                    title="Навыки"
                    items={skills}
                    inputLabel="Добавить навык"
                    inputValue={skillInput}
                    onInputChange={onSkillInputChange}
                    onAdd={onAddSkill}
                    onRemove={onRemoveSkill}
                />

                <Divider />

                <ProfileChipEditorSection
                    title="Интересы"
                    items={interests}
                    inputLabel="Добавить интерес"
                    inputValue={interestInput}
                    onInputChange={onInterestInputChange}
                    onAdd={onAddInterest}
                    onRemove={onRemoveInterest}
                />

                <Divider />

                <Stack spacing={2}>
                    <Typography
                        sx={{
                            fontSize: 24,
                            fontWeight: 600,
                        }}
                    >
                        Опыт
                    </Typography>
                    <ProfileTimelineEditor
                        items={timeline}
                        onAdd={onAddTimelineItem}
                        onRemove={onRemoveTimelineItem}
                        onChange={onTimelineItemChange}
                    />
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileEditAdditionalSection;
