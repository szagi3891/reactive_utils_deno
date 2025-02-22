import { exec, execAndGet } from "./exec.ts";
import { getBranchCommitCount, getBranchCommits, getBranchName } from "./git.ts";

export class Dir {
    constructor(private readonly cwd: string) {}

    async exec(commandStr: string, env?: Record<string, string>): Promise<void> {
        await exec(this.cwd, commandStr, env);
    }

    async execAndGet(commandStr: string, env?: Record<string, string>): Promise<string> {
        const result = await execAndGet(this.cwd, commandStr, env);
        return result;
    }

    async getBranchCommits(branch: string): Promise<Array<string>> {
        const list = await getBranchCommits(this.cwd, branch);
        return list;
    }

    async getBranchCommitCount(branch: string): Promise<number> {
        const count = await getBranchCommitCount(this.cwd, branch);
        return count;
    }

    async getBranchName(): Promise<string> {
        const name = await getBranchName(this.cwd);
        return name;
    }
}
