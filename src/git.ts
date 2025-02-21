import { execAndGet } from "./exec.ts";

export const branchCommitCount = async (cwd: string, branch: string): Promise<number> => {    
    const result = await execAndGet(cwd, `git rev-list --count ${branch}`);

    const count = Number(result);
    if (isNaN(count)) {
        throw Error('problem with reading the number of commits')
    }
    return count;
};

export const branchCommits = async (cwd: string, branch: string): Promise<Array<string>> => {
    const result = await execAndGet(cwd, `git log ${branch} --pretty=format:%H`);

    const lines = result.split('\n').filter((line) => (line.trim() === '' ? false : true));

    const count = await branchCommitCount(cwd, branch);
    if (lines.length !== count) {
        throw Error('problem with reading the list of commits');
    }

    return lines;
};

export const branchName = async (cwd: string): Promise<string> => {
    const branchName = await execAndGet(cwd, 'git rev-parse --abbrev-ref HEAD');
    return branchName.trim();;
};

