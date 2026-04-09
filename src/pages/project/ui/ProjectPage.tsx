import { Stack } from "@mui/material";

import { projectDetails, projectRequirements } from "../model/mockData";

import ProjectEventSection from "./ProjectEventSection";
import ProjectHeroSection from "./ProjectHeroSection";
import ProjectRequirementsSection from "./ProjectRequirementsSection";

const ProjectPage = () => {
    return (
        <Stack spacing={3}>
            <ProjectHeroSection details={projectDetails} />
            <ProjectRequirementsSection
                title={projectDetails.requirementsTitle}
                footer={projectDetails.requirementsFooter}
                requirements={projectRequirements}
            />
            <ProjectEventSection details={projectDetails} />
        </Stack>
    );
};

export default ProjectPage;
