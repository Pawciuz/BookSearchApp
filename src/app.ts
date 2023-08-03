const button = document.querySelector("button")!
const box = document.querySelector(".window")!
const searchIcon = document.querySelector(".search-icon")!
const searchInput = document.querySelector(".search-input") as HTMLInputElement
const apiContent = document.querySelector(".APIcontent")!
const titleContent = document.querySelector(".title")!.querySelector("span")!
const authorContent = document.querySelector(".author")!.querySelector("span")!
const subjectContent = document
	.querySelector(".subject")!
	.querySelector("span")!
const loadingCircle = document.querySelector(".loading")! as HTMLBaseElement
const errorArea = document.querySelector(".error")!
const coverImg = document.querySelector(".cover")! as HTMLCanvasElement
const noTitle = document.querySelector(".error-title")!
const expand = () => {
	if (
		searchInput.value === "" &&
		searchIcon.matches(".fa-magnifying-glass")
	) {
		noTitle.classList.add("show")
	} else {
		noTitle.classList.add("remove")
		box.classList.toggle("expand")
		box.classList.remove("more-expand")
		searchIcon.classList.toggle("fa-magnifying-glass")
		searchIcon.classList.toggle("fa-xmark")
		if (searchIcon.matches(".fa-xmark")) {
			// clicking search
			loadingCircle.classList.toggle("show")
			loadingCircle.style.display = "grid"
			showInformation()
		} else {
			// closing with x button
			errorArea.classList.remove("show")
			apiContent.classList.remove("show")
			coverImg.style.display = "none"
			titleContent.textContent = ""
			authorContent.textContent = ""
			subjectContent.textContent = ""
		}
	}
}
async function showInformation() {
	let url = "https://openlibrary.org/search.json?q="

	url += searchInput.value.replace(/\s+/g, "+").toLowerCase()
	searchInput.value = ""
	fetch(url)
		.then((res) => res.json())
		.then((data) => {
			let title, authorName, subjectFacet, isbn, coverUrl
			try {
				title = data.docs[0].title
				authorName = data.docs[0].author_name
				isbn = data.docs[0].isbn[0]
				try {
					subjectFacet = data.docs[0].subject_facet[0]
				} catch {
					subjectFacet = "none"
				}
				if (
					title.length > 28 ||
					authorName.length > 28 ||
					subjectFacet.length
				) {
					console.log(title.length)
					box.classList.toggle("more-expand")
				}
			} catch {
				errorArea.classList.add("show")
				apiContent.classList.add("show")
			}
			coverUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
			fetch(coverUrl)
				.then((res) => {
					coverImg.setAttribute("src", res.url)
				})
				.then(() => (coverImg.style.display = "block"))
			loadingCircle.classList.toggle("show")
			loadingCircle.style.display = "none" // this is because opacity dont cancel animation
			apiContent.classList.toggle("show")
			titleContent.textContent = title
			authorContent.textContent = authorName
			subjectContent.textContent = subjectFacet
		})
}
const prepareDOMEvents = () => {
	button.addEventListener("click", expand)
	searchInput.addEventListener("keyup", (e) => {
		if (e.key === "Enter") {
			expand()
		} else if (searchIcon.matches(".fa-xmark")) {
			box.classList.remove("more-expand")
			box.classList.toggle("expand")
			searchIcon.classList.toggle("fa-magnifying-glass")
			searchIcon.classList.toggle("fa-xmark")
			errorArea.classList.remove("show")
			apiContent.classList.remove("show")
			coverImg.style.display = "none"
			titleContent.textContent = ""
			authorContent.textContent = ""
			subjectContent.textContent = ""
		}
	})
}
const main = () => {
	prepareDOMEvents()
}

document.addEventListener("DOMContentLoaded", main)
