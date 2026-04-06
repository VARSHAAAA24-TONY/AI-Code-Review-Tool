import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

export const githubService = {
  /**
   * Parses a GitHub URL to extract owner and repo name.
   * Format: https://github.com/owner/repo
   */
  parseUrl(url) {
    try {
      const parts = url.replace('https://github.com/', '').split('/');
      return { owner: parts[0], repo: parts[1] };
    } catch (e) {
      return null;
    }
  },

  /**
   * Fetches the content of a file or directory from a public repo.
   */
  async getRepoContent(owner, repo, path = '') {
    try {
      const response = await axios.get(`${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching from GitHub:', error);
      throw error;
    }
  },

  /**
   * Fetches the full content of all files in a repo (limited for AI context).
   */
  async fetchFullRepoCode(url) {
    const { owner, repo } = this.parseUrl(url);
    if (!owner || !repo) throw new Error('Invalid GitHub URL');

    let contents = await this.getRepoContent(owner, repo);
    
    // Check if there's a 'src' directory if we don't find enough files in root
    const rootFiles = contents.filter(item => item.type === 'file' && this.isCodeFile(item.name));
    
    if (rootFiles.length < 3) {
      const srcDir = contents.find(item => item.type === 'dir' && item.name === 'src');
      if (srcDir) {
        const srcContents = await this.getRepoContent(owner, repo, 'src');
        contents = [...contents, ...srcContents];
      }
    }

    const codeFiles = contents.filter(item => 
      item.type === 'file' && this.isCodeFile(item.name)
    );

    let combinedCode = '';
    // Limit to first 8 files to avoid overwhelming the LLM
    for (const file of codeFiles.slice(0, 8)) {
      const fileData = await axios.get(file.download_url);
      combinedCode += `\n// File: ${file.path}\n${fileData.data}\n`;
    }

    if (!combinedCode) throw new Error('No valid source code files found in root or src/');

    return combinedCode;
  },

  isCodeFile(name) {
    const ext = name.split('.').pop();
    return ['js', 'jsx', 'ts', 'tsx', 'py', 'css', 'html'].includes(ext);
  }
};

