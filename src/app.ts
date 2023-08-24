let button: HTMLButtonElement;
let box: HTMLDivElement;
let searchIcon: HTMLBodyElement;
let searchInput: HTMLInputElement;
let apiContent: HTMLBodyElement;
let titleContent: HTMLSpanElement;
let authorContent: HTMLSpanElement;
let subjectContent: HTMLSpanElement;
let loadingCircle: HTMLBaseElement;
let errorArea: HTMLBodyElement;
let coverImg: HTMLCanvasElement;
const noTitle = document.querySelector('.error-title')!;
const expand = () => {
	if (!loadingCircle.matches('.show')) {
		if (searchInput.value === '' && searchIcon.matches('.fa-magnifying-glass')) {
			noTitle.classList.add('show');
			setTimeout(() => noTitle.classList.remove('show'), 2000);
		} else {
			noTitle.classList.remove('show');
			box.classList.toggle('expand');
			box.classList.remove('more-expand');
			searchIcon.classList.toggle('fa-magnifying-glass');
			searchIcon.classList.toggle('fa-xmark');
			if (searchIcon.matches('.fa-xmark')) {
				// clicking search
				loadingCircle.classList.toggle('show');
				loadingCircle.style.display = 'block';
				showInformation();
			} else {
				// closing with x button
				errorArea.classList.remove('show');
				apiContent.classList.remove('show');
				coverImg.style.display = 'none';
				titleContent.textContent = '';
				authorContent.textContent = '';
				subjectContent.textContent = '';
			}
		}
	}
};
async function showInformation() {
	let url = 'https://openlibrary.org/search.json?q=';

	url += searchInput.value.replace(/\s+/g, '+').toLowerCase();
	searchInput.value = '';
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			let title: string = '',
				authorName: string = '',
				subjectFacet: string = '',
				isbn: string = '',
				coverUrl: string = '';
			try {
				title = data.docs[0].title;
				authorName = data.docs[0].author_name;
				isbn = data.docs[0].isbn[0];
				try {
					subjectFacet = data.docs[0].subject_facet[0];
				} catch {
					subjectFacet = 'none';
				}
				if (title.length > 28 || authorName.length > 28 || subjectFacet.length > 28) {
					box.classList.toggle('more-expand');
				}
			} catch {
				errorArea.classList.add('show');
				apiContent.classList.add('show');
			}
			coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
			fetch(coverUrl)
				.then((res) => {
					coverImg.setAttribute('src', res.url);
				})
				.then(() => (coverImg.style.display = 'block'));
			loadingCircle.classList.toggle('show');
			loadingCircle.style.display = 'none'; // this is because opacity dont cancel animation
			apiContent.classList.toggle('show');
			titleContent.textContent = title;
			authorContent.textContent = authorName;
			subjectContent.textContent = subjectFacet;
		});
}
const keyboardSearch = (e: any) => {
	if (!loadingCircle.matches('.show')) {
		if (e.key === 'Enter') {
			expand();
		} else if (searchIcon.matches('.fa-xmark')) {
			box.classList.remove('more-expand');
			box.classList.toggle('expand');
			searchIcon.classList.toggle('fa-magnifying-glass');
			searchIcon.classList.toggle('fa-xmark');
			errorArea.classList.remove('show');
			apiContent.classList.remove('show');
			coverImg.style.display = 'none';
			titleContent.textContent = '';
			authorContent.textContent = '';
			subjectContent.textContent = '';
		}
	}
};
const prepareDOMElements = () => {
	button = document.querySelector('button')!;
	box = document.querySelector('.window')!;
	searchIcon = document.querySelector('.search-icon')!;
	searchInput = document.querySelector('.search-input')!;
	apiContent = document.querySelector('.APIcontent')!;
	titleContent = document.querySelector('.title')!.querySelector('span')!;
	authorContent = document.querySelector('.author')!.querySelector('span')!;
	subjectContent = document.querySelector('.subject')!.querySelector('span')!;
	loadingCircle = document.querySelector('.loading')!;
	errorArea = document.querySelector('.error')!;
	coverImg = document.querySelector('.cover')!;
};
const prepareDOMEvents = () => {
	button.addEventListener('click', expand);
	searchInput.addEventListener('keyup', keyboardSearch);
};

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

document.addEventListener('DOMContentLoaded', main);
