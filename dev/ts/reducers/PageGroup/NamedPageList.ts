import {PageList, PageProps} from "./PageList";
export type NamedPageList = {[key: string]: PageProps};
export default function (pages: PageList): NamedPageList {
	let ret = {};
	pages.left.map((page) => ret[page.href] = page);
	pages.right.map((page) => ret[page.href] = page);
	return ret;
}