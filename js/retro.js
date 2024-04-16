const cardContainer = document.getElementById('card-container');

fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
.then(res => res.json())
.then(data => {
    const postsData = data;
    postsData.forEach(element => {
        console.log(element.cover_image);
        showCards(element);
    });
})
.catch (err => console.log(err.message));

function showCards(element){
    // console.log(element.cover_image);
    cardContainer.innerHTML += `
    <div id="card-details" class="card bg-base-100 border-2 mb-4 lg:mb-0">
        <figure class="px-10 pt-10">
            <img src="${element.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
            <div class="flex items-center text-[#12132D99] gap-2">
                <i class="fa-regular fa-calendar"></i>
                ${element.author.posted_date?`<p>${element.author.posted_date}</p>` : 'No publish Date'}
            </div>
            <h2 class="card-title font-bold">${element.title}</h2>
            <p class="text-[#12132D99]">${element.description}</p>
            <div class="flex items-center gap-4">
                <img class="rounded-full w-[45px]" src="${element.profile_image}" alt="">
                <p><span class="font-bold">${element.author.name}</span><br>
                <span class="text-[#12132D99]">${element.author.designation?`<span class="text-[#12132D99]">${element.author.designation}</span>`:'Unknown'}</span></p>
            </div>
        </div>
    </div>
    `
}
