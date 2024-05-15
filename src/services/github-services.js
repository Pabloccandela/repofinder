export const getRepositories = async (text, page = 0) => {
    try {
        if (text == null || text === '' || text === undefined) {
            throw new Error('Text is required');
        }

        const perPage = 10;
        const url = `https://api.github.com/search/repositories?q=${text}&per_page=${perPage}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        
        return { data: data.items, totalCount: data.total_count, error: null };
    } catch (error) {
        return { data: null, totalCount: 0, error: error.message };
    }
  };
  

export const getRepositoryByOwnerAndRepo = async (owner, repoName) => {
    try {
        const url = `https://api.github.com/repos/${owner}/${repoName}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch repository');
        }
        const data = await response.json();
        console.log(data);
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
};