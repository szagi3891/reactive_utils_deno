// console.info('podbijam wersję ');
import fs from 'node:fs';
import { z } from 'zod';

const ContentZod = z.object({
    version: z.string(),
}).passthrough();

const throwNever = (): never => {
    throw Error('Never ...');
};

const getVersion = async (): Promise<string> => {
    const contentDenoJson = ContentZod.parse(JSON.parse((await fs.promises.readFile('./deno.json')).toString()));
    return contentDenoJson.version;
};

const incrementVersion = (version: string): string => {
    const chunks = version.split('.');
    const last = chunks[chunks.length - 1] ?? throwNever();
    const lastNumber = parseInt(last, 10) + 1;
    chunks[chunks.length - 1] = lastNumber.toString();

    const nextVersion = chunks.join('.');
    return nextVersion;
};

//TODO - przenieść ten kod jako biblioteka do src i użyć również w reactive/utils ?

const main = async (): Promise<void> => {

    // const content = ContentZod.parse(JSON.parse((await fs.promises.readFile('./jsr.json')).toString()));

    // const version = content.version;

    const version = await getVersion();
    
    const nextVersion = incrementVersion(version);

    console.info(`git add . && git commit -am "version ${nextVersion}" && npx jsr publish && git push origin main:main`);

    const contentDenoJson = ContentZod.parse(JSON.parse((await fs.promises.readFile('./deno.json')).toString()));
    contentDenoJson.version = nextVersion;
    await fs.promises.writeFile('./deno.json', JSON.stringify(contentDenoJson, null, 4));
};

main().then(() => {
    console.info('koniec');
}).catch((error) => {
    console.error(error);
});

