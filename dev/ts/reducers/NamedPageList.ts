import {Pages, PageProps, default as PageList} from "./PageList";
export default function (): {[key: string]: PageProps} {
	let ret = {};
	let pages: Pages = PageList(null, null);
	pages.left.map((page) => ret[page.href] = page);
	pages.right.map((page) => ret[page.href] = page);
	return ret;
}