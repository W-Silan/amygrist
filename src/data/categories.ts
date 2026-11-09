import records from "../../migration/category-archives.json";

export interface CategoryRecord {name:string;slug:string;path:string;description:string;seoDescription:string;postCount:number;indexable:boolean}
export const categories = records as CategoryRecord[];
export function getCategoryForName(name:string) { return categories.find((category) => category.name === name); }
