
export namespace TokenHandler
{
    export async function getOrGenerateToken(tokenFile: Bun.BunFile, placeholder: string)
    {
        const name = tokenFile.name;
        let isPlaceholder: boolean = false;
        let token: string = "";
        try {
            token = (await tokenFile.text()).trim();
            isPlaceholder = token === placeholder.trim();
            if (isPlaceholder)
                console.warn(`${name}:`, "You're still using the placeholder token! Replace it immediatley or you won't be able to use it!");
            else
                console.log(`${name}:`, "Token found.");
        } catch (err: any) {
            if (err.code !== "ENOENT") throw err;

            // NOT tokenFile.write because it WILL THROW EXCEPTION IF FOLDERS DO NOT EXIST!!
            await Bun.write(tokenFile, placeholder);
            token = placeholder;

            console.log(`${name}:`, "New token file was generated! Replace placeholder with your own token!");
            isPlaceholder = true;
        }
        return [token, isPlaceholder];
    }
}