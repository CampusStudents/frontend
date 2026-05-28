type ListResponse<T> =
    | T[]
    | {
          items?: T[];
          data?: T[];
          results?: T[];
          content?: T[];
      }
    | null
    | undefined;

export const normalizeListResponse = <T>(response: ListResponse<T>): T[] => {
    if (Array.isArray(response)) {
        return response;
    }

    if (!response) {
        return [];
    }

    return (
        response.items ??
        response.data ??
        response.results ??
        response.content ??
        []
    );
};
