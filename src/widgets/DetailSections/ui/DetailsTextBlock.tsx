import { Stack, Typography } from "@mui/material";

import DetailsSectionDivider from "./DetailsSectionDivider";

type DetailsTextBlockProps = {
    label: string;
    paragraphs: string[];
};

const DetailsTextBlock = ({ label, paragraphs }: DetailsTextBlockProps) => {
    return (
        <Stack spacing={1.25}>
            <Typography
                variant="body2"
                sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                }}
            >
                {label}
            </Typography>
            <DetailsSectionDivider />
            {paragraphs.map((paragraph, index) => (
                <Typography
                    key={index}
                    variant="body2"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.65,
                    }}
                >
                    {paragraph}
                </Typography>
            ))}
        </Stack>
    );
};

export default DetailsTextBlock;
