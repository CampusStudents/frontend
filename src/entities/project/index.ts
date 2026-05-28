import ProjectCard from "./ui/ProjectCard";

export { ProjectCard };
export { default as MyProjectCard } from "./ui/MyProjectCard";
export { default as ProjectCardEventRow } from "./ui/ProjectCardEventRow";
export { default as CandidateCard } from "./ui/CandidateCard";
export {
    mapProjectDtoToMyProjectCard,
    mapProjectDtoToProjectCard,
} from "./lib/mapProjectDtoToCard";
export {
    getProjectEventId,
    getProjectEventTitle,
} from "./lib/getProjectEventTitle";
export { resolveCardEvent, resolveMyCardEvent } from "./lib/resolveCardEvent";
export type {
    CandidatesCardData,
    MyProjectCardData,
    ProjectCardData,
} from "./model/types";
