function loadRepos() {
	const input = document.getElementById('username');
	let ulRepos = document.getElementById('repos');
	let user = input.value;
	let url = `https://api.github.com/users/${user}/repos`;

	fetch(url)
		.then(res => res.json())
		.then(data => {
			data.forEach(element => {

				let li = createLi(element.full_name, element.html_url);
				ulRepos.appendChild(li);
			});
		})


	function createLi(name, url){
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.textContent = name;
		a.href = url;
		li.appendChild(a);
		return li;
	}

}