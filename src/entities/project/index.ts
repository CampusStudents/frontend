import ProjectCard from "./ui/ProjectCard";

export { ProjectCard };
export { default as MyProjectCard } from "./ui/MyProjectCard";
export { default as CandidateCard } from "./ui/CandidateCard";
export {
    mapProjectDtoToMyProjectCard,
    mapProjectDtoToProjectCard,
} from "./lib/mapProjectDtoToCard";
export type {
    CandidatesCardData,
    MyProjectCardData,
    ProjectCardData,
} from "./model/types";
