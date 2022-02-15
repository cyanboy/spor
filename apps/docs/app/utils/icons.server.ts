import fs from "fs/promises";
import path from "path";

/** Gets the file buffer of the spor icon .zip file */
export const getIconsZipFile = async () => {
  const iconsPath = await getPathToIconsZipFile();
  return fs.readFile(iconsPath);
};

type getIconArgs = { category?: string; fileName?: string };
export const getIcon = async ({ category, fileName }: getIconArgs) => {
  const safeFileName = fileName?.replace(/\.\./g, "") ?? "";
  const safeCategory = category?.replace(/\.\./g, "") ?? "";
  const basePath = await getPathToIconsSvgFolder();
  try {
    return await fs.readFile(path.join(basePath, safeCategory, safeFileName));
  } catch (e) {
    return null;
  }
};

const getPathToSporIconsFolder = async (
  currentPath: string = "."
): Promise<string> => {
  const pathToCheck = path.resolve(
    currentPath,
    "..",
    "node_modules",
    "@vygruppen",
    "spor-icon"
  );

  if (await doesFileExist(pathToCheck)) {
    return pathToCheck;
  }
  if (currentPath === "/") {
    throw new Error(
      "No @vygruppen/spor-icon package found. Are you sure it's installed?"
    );
  }
  return await getPathToSporIconsFolder(path.resolve("..", currentPath));
};

const getPathToIconsZipFile = async () => {
  const basePath = await getPathToSporIconsFolder();
  return path.resolve(basePath, "dist", "spor-icons.zip");
};

const getPathToIconsSvgFolder = async () => {
  const basePath = await getPathToSporIconsFolder();
  return path.resolve(basePath, "svg");
};

const doesFileExist = async (filePath: string) => {
  try {
    await fs.stat(filePath);
    return true;
  } catch (e) {
    return false;
  }
};
