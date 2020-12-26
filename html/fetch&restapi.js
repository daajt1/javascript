( function() {
	'use strict';

	// Variables.
	const filterForm     = document.getElementById( 'filter-contacts' );
	const contactWrapper = document.getElementById( 'contact-section' );
	const htmlOutput     = document.getElementById( 'js-contact-replace' );
	const cityField      = document.getElementById( 'select-office' );
	const areaField      = document.getElementById( 'select-area' );
	const searchField    = document.getElementById( 'search-contacts' );

	// Filtering and search REST url.
	const restUrl  = '/wp-json/wp/v2/contact?_embed&per_page=100';

	// Set empty contacts array and fetch all the data in there.
	const contacts = [];

	// Add loading class.
	contactWrapper.classList.add( 'loading' );

	// Fetch info from REST API. 
	fetch( restUrl )
		.then( function( response ) {
			const contentType = response.headers.get( 'content-type' );
			const totalCount  = response.headers.get( 'x-wp-total' );
			const pages       = response.headers.get( 'x-wp-totalpages' );

			if ( contentType && contentType.includes( 'application/json' ) ) {
				loadMore( totalCount, pages );
				return response.json();
			}
			throw new TypeError( 'Oops, the format is not JSON.' );
		});

	// Load contact info, 100 contacts at one time.
	function loadMore( totalCount, pages ) {
		const restUrl  = '/wp-json/wp/v2/contact?_embed&per_page=100';

		// Loop all pages, which was counted from the first REST API fetch.
		for ( let i = 1; i <= pages; i++ ) {
			fetch( restUrl + '&page=' + i )
				.then( blob => blob.json() )
				.then( function( data ) {

					// Add data to contacts array.
					contacts.push( ...data );

					// When all data have been loaded, init first filtering and remove 'loading' class.
					if ( contacts.length == totalCount ) {
						filterByCategory();
						contactWrapper.classList.remove( 'loading' );
					}
				});
		}
	}

	// Template for contact cards.
	function contactsTemplate( item, itemTitle, itemJobTitle, itemPhone ) {

		// Get featured image if it's exist. Default img set in functions.php
		let featuredImg = 0 !== item.featured_media ? item._embedded['wp:featuredmedia'][0]['media_details']['sizes']['valteri-small']['source_url'] : ValteriContacts.defaultImg;

		// Get other data.
		let title    = '' == itemTitle ? item.title.rendered : itemTitle;
		let jobTitle = '' == itemTitle ? item.contact_meta_fields._valteri_contact_job_title[0]: itemJobTitle;
		let email    = item.contact_meta_fields._valteri_contact_email[0];
		let phone    = '' == itemPhone ? item.contact_meta_fields._valteri_contact_phone[0]: itemPhone;
		let cat      = item._embedded['wp:term'][0][0]['name'];
		let area     = item._embedded['wp:term'][1][0]['name'];
		let info     = item.contact_meta_fields._valteri_contact_info[0];

		// Add article.
		return `<article class="hentry contact">
					<div class="entry-inner-wrapper entry-inner-contact">
						<header class="entry-header">
							<p class="entry-author">
								<img class="attachment-valteri-small size-valteri-small wp-post-image" src="${featuredImg}" alt="">
							</p>
							<h2 class="entry-title heading-medium">${title}</h2>
						</header>
						<div class="entry-summary">
							<ul class="border-list no-margin-bottom">
								<li>${jobTitle}</li>
								<li><a href="mailto:${email}">${email}</a></li>
								<li>${ValteriContacts.phone} ${phone}</li>
								<li>${cat}</li>
								<li>${area}</li>
								<li>${info}</li>
							</ul>
						</div>
					</div>
				</article>`;
	}

	// Filter by area category.
	function filterByCategory() {

		// Get field values.
		const office = cityField.value;
		const area   = areaField.value;

		// Sent as empty.
		const title    = '';
		const jobTitle = '';
		const phone    = '';

		// Filter by field values.
		const filteredArray = contacts.filter( contact => ( contact.contact_cat[0] == office && contact.contact_area[0] == area ) );
		console.log( filteredArray );

		// Sort by name.
		const sortArray = filteredArray.sort( ( a, b ) => a.title.rendered > b.title.rendered ? 1 : -1 );

		// Empty previous output.
		htmlOutput.innerHTML = '';

		// Clear search field.
		searchField.value = '';

		// If we have data, lets load it.
		if ( 0 < sortArray.length ) {
			const html = sortArray.map( contact => {
				return contactsTemplate( contact, title, jobTitle, phone );
			}).join( '' );

			htmlOutput.innerHTML = html;

			// Let screen reader announce the success message.
			wp.a11y.speak( ValteriContacts.found, 'assertive' );
		} else {
			const notFound = `<p class="contacts-not-found center-block">${ValteriContacts.notFound}</p>`;	
			htmlOutput.innerHTML = notFound;

			// Let screen reader announce the not found message.
			wp.a11y.speak( ValteriContacts.notFound, 'assertive' );
		}
	}

	// Find search match results.
	function findMatches( wordToMatch, contacts ) {
		return contacts.filter( search => {

			// What was searched.
			const regex = new RegExp( wordToMatch, 'gi' );
			return search.title.rendered.match( regex ) || search.contact_meta_fields._valteri_contact_job_title[0].match( regex ) || search.contact_meta_fields._valteri_contact_phone[0].match( regex );
		});
	}

	// Display search results.
	function displayMatches() {

		// Find matches.
		const matchArray = findMatches( this.value, contacts );

		// Sort alphabetically.
		const sortArray = matchArray.sort( ( a, b ) => a.title.rendered > b.title.rendered ? 1 : -1 );

		// 
		const html = sortArray.map( contact => {
			const regex    = new RegExp( this.value, 'gi' );

			// Add highlight <span>.
			const title    = contact.title.rendered.replace( regex, `<span class="highlight">${this.value}</span>` );
			const jobTitle = contact.contact_meta_fields._valteri_contact_job_title[0].replace( regex, `<span class="highlight">${this.value}</span>` );
			const phone    = contact.contact_meta_fields._valteri_contact_phone[0].replace( regex, `<span class="highlight">${this.value}</span>` );
			return contactsTemplate( contact, title, jobTitle, phone );
		}).join( '' );

		// Add contact cards, empty first just in case.
		htmlOutput.innerHTML = '';
		htmlOutput.innerHTML = html;
	}

	// Filter by selected category.
	cityField.addEventListener( 'change', filterByCategory );
	areaField.addEventListener( 'change', filterByCategory );

	// Filter by search.
	searchField.addEventListener( 'change', displayMatches );
	searchField.addEventListener( 'keyup', displayMatches );

}() );