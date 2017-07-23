const streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion',
	'freecodecamp', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];

function makeChannelURL (name) {
	return `https://wind-bow.glitch.me/twitch-api/streams/${name}`;
}

function makeUserURL (name) {
	return `https://wind-bow.glitch.me/twitch-api/users/${name}`;
}

function makeTwitchURL (name) {
	return `https://www.twitch.tv/${name}`;
}

async function getData (streamers) {
	for (i in streamers) {
		const ul = document.getElementById('streams');
		const div = document.createElement('div');
		const li = document.createElement('li');
		const span1 = document.createElement('span');
		const span2 = document.createElement('span');
		const span3 = document.createElement('span');
		const name = streamers[i];

		// Gather data
		const twitchURL = makeTwitchURL(name);
		const channelData = await fetch(makeChannelURL(streamers[i]))
			.then((data) => data.json());
		const userLogo = await fetch(makeUserURL(streamers[i]))
			.then((data) => data.json())
			.then((data) => data.logo);

		// Format and display data		
		div.appendChild(span1).innerHTML = `<a href="${twitchURL}"><img src="${userLogo}"></a>`;
		div.appendChild(span2).innerText = name;
		
		// If the stream object exists, meaning the stream is online, display status
		if (channelData.stream) {
			const game = channelData.stream.channel.game;
			const status = channelData.stream.channel.status;
			let online = `${game}: ${status}`;
			// Ensure text length of 'status' is 48 characters max
			if (online.length > 51) {
				online = online.slice(0, 48) + '...';
			}
			div.appendChild(span3).innerHTML = `<a href="${twitchURL}" target="_blank">${online}</a>`;
		} else {
			// Else, display that it's offline.
			div.appendChild(span3).innerHTML = `<a href="${twitchURL}" target="_blank">Offline</a>`;
		}

		span1.classList.add('logo');
		span2.classList.add('name');
		span3.classList.add('status');

		ul.appendChild(li);
		li.appendChild(div);
		
		div.classList.add('row');
		span1.classList.add('col-xs-2');
		span2.classList.add('col-xs-3');
		span3.classList.add('col-xs-7');
	};
}

function addListeners () {
	// Add the click listeners for the buttons.
	const all = document.getElementById('all');
	const online = document.getElementById('online');
	const offline = document.getElementById('offline');
	const lis = document.querySelectorAll('li');

	all.addEventListener('click', function () {
		for (let i = 0; i < lis.length; i++) {
			lis[i].style.display = 'block';
		}
	});

	online.addEventListener('click', function () {
		for (let i = 0; i < lis.length; i++) {
			// Make the hidden blocks visible again.
			lis[i].style.display = 'block';
			if (lis[i].innerHTML.includes('Offline')) {
				lis[i].style.display = 'none';
			}
		}
	});

	offline.addEventListener('click', function () {
		for (let i = 0; i < lis.length; i++) {
			lis[i].style.display = 'block';
			if (!lis[i].innerHTML.includes('Offline')) {
				lis[i].style.display = 'none';
			}
		}
	});
}

getData(streamers);
setTimeout(addListeners, 2000);
