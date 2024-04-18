const cardContainer = document.getElementById('card-container');

let count = 0;

fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
    .then(res => res.json())
    .then(data => {
        allData(data.posts);
    })
    .catch(err => console.log(err.message));


function allData(element1) {
    const allPostsContainer = document.getElementById('all-posts-container');

    for (const property of element1) {
        const postContainer = document.createElement('div');
        postContainer.classList = `lg:flex gap-4 border-2 rounded-3xl bg-[#797DFC1A] p-8 mb-4`;
        const badgeColorClass = property.isActive ? 'badge-success' : 'badge-error';

        postContainer.innerHTML = `
        <div class="indicator">
            <span class="${badgeColorClass} indicator-item badge badge-xs border-white"></span>
            <img class="w-[60px] h-max rounded-xl" src="${property.image}" alt="">
        </div>
    
        <div class="w-full">
            <p class="text-[#12132D99] font-bold pb-4 mt-4 lg:mt-0">#<span class="mr-8">${property.category}</span><span>Author : ${property.author.name}</span></p>
            <h2 class="font-bold text-lg">${property.title}</h2>
            <p class="text-[#12132D99] border-b-2 border-dashed py-4">${property.description}</p>
            <div class="flex justify-between items-center mt-4">
                <div class="flex gap-4 text-[#12132D99]">
                    <div class="flex gap-2">
                        <img src="images/Vector (2).svg" alt="">
                        <p>${property.comment_count}</p>
                    </div>
                    <div class="flex gap-2">
                        <img src="images/Vector (3).svg" alt="">
                        <p>${property.view_count}</p>
                    </div>
                    <div class="flex gap-2">
                        <img src="images/Vector (4).svg" alt="">
                        <p>${property.posted_time} min</p>
                    </div>
                </div>
                <img onclick="showPopUp('${property.title.replace("'","@")}', '${property.view_count}')" src="images/Vector (1).svg" alt="">
            </div>
        </div>
    `
        allPostsContainer.appendChild(postContainer);
    }
}

function showPopUp(title, view_count) {
    // console.log(title);
    const readingNumber = document.getElementById('reading');
    count++;
    readingNumber.innerText = count;

    const popUpContainer = document.getElementById('popup-container');
    const postContainer = document.createElement('div');
    postContainer.classList = `flex justify-between items-center rounded-3xl bg-[#FFFFFF] p-8 mt-4`;
    postContainer.innerHTML = `
    
        <h2 class="font-bold lg:text-lg">${title.replace("@","'")}</h2>
        <div class="flex gap-2">
            <img src="images/Vector (3).svg" alt="">
            <p>${view_count}</p>
        </div>

    `
    popUpContainer.appendChild(postContainer);
}

function searchCategory() {
    const loadingSpinner = document.getElementById('loading-spinner');
    loadingSpinner.classList.remove('hidden');

    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`)
        .then(res => res.json())
        .then(data => {
            searchCategory2(data.posts);
        })
        .catch(err => console.log(err.message));
}

function searchCategory2(element2) {
    const inputField = document.getElementById('input-field');
    const inputValue = inputField.value;

    const allPostsContainer = document.getElementById('all-posts-container');
    allPostsContainer.classList.add('hidden');
    const allPostsContainer2 = document.getElementById('all-posts-container2');
    allPostsContainer2.innerHTML = "";
    allPostsContainer2.classList.add('hidden');

    for (const property of element2) {
        if (inputValue === property.category) {
            // console.log('Yes');
            searchData(property);
        }
    }
    
}

function searchData (property)  {
    setTimeout(() => {
        const loadingSpinner = document.getElementById('loading-spinner');
        loadingSpinner.classList.add('hidden');
    }, 2000)
    const allPostsContainer2 = document.getElementById('all-posts-container2');
    allPostsContainer2.classList.remove('hidden');
    const postContainer = document.createElement('div');
    postContainer.classList = `lg:flex gap-4 border-2 rounded-3xl bg-[#797DFC1A] p-8 mb-4`;
    const badgeColorClass = property.isActive ? 'badge-success' : 'badge-error';
    postContainer.innerHTML = `
        <div class="indicator">
            <span class="${badgeColorClass} indicator-item badge badge-xs border-white"></span>
            <img class="w-[60px] h-max rounded-xl" src="${property.image}" alt="">
        </div>
    
        <div class="w-full">
            <p class="text-[#12132D99] font-bold pb-4 mt-4 lg:mt-0">#<span class="mr-8">${property.category}</span><span>Author : ${property.author.name}</span></p>
            <h2 class="font-bold text-lg">${property.title}</h2>
            <p class="text-[#12132D99] border-b-2 border-dashed py-4">${property.description}</p>
            <div class="flex justify-between items-center mt-4">
                <div class="flex gap-4 text-[#12132D99]">
                    <div class="flex gap-2">
                        <img src="images/Vector (2).svg" alt="">
                        <p>${property.comment_count}</p>
                    </div>
                    <div class="flex gap-2">
                        <img src="images/Vector (3).svg" alt="">
                        <p>${property.view_count}</p>
                    </div>
                    <div class="flex gap-2">
                        <img src="images/Vector (4).svg" alt="">
                        <p>${property.posted_time} min</p>
                    </div>
                </div>
                <img onclick="showPopUp('${property.title.replace("'","@")}', '${property.view_count}')" src="images/Vector (1).svg" alt="">
            </div>
        </div>
    `

    allPostsContainer2.appendChild(postContainer);
    
}

fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    .then(res => res.json())
    .then(data => {
        const postsData = data;
        postsData.forEach(element => {
            // console.log(element);
            showCards(element);
        });
    })
    .catch(err => console.log(err.message));

function showCards(element) {
    cardContainer.innerHTML += `
    <div id="card-details" class="card bg-base-100 border-2 mb-4 lg:mb-0">
        <figure class="px-10 pt-10">
            <img src="${element.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body">
            <div class="flex items-center text-[#12132D99] gap-2">
                <i class="fa-regular fa-calendar"></i>
                ${element.author.posted_date ? `<p>${element.author.posted_date}</p>` : 'No publish Date'}
            </div>
            <h2 class="card-title font-bold">${element.title}</h2>
            <p class="text-[#12132D99]">${element.description}</p>
            <div class="flex items-center gap-4">
                <img class="rounded-full w-[45px]" src="${element.profile_image}" alt="">
                <p><span class="font-bold">${element.author.name}</span><br>
                <span class="text-[#12132D99]">${element.author.designation ? `<span class="text-[#12132D99]">${element.author.designation}</span>` : 'Unknown'}</span></p>
            </div>
        </div>
    </div>
    `
}

