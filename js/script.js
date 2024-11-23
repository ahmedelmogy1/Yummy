//^ GET ELEMENT FROM HTML
let closeButton = $(".closeButton");
let closeButtonIcon1 = $(".closeButtonIcon1");
let closeButtonIcon2 = $(".closeButtonIcon2");
let navInner = $(".nav-inner");
let nav = $(".navb");

//? Api
let homeApi;

// & Selcet elment 
let search = $(".search");
let contentCards = $(".contentCards");
let section1 = $(".section1");
let Categories = $(".Categories");
let area = $(".area");


//^ Regex
let regexname=/^[a-z0-9_-]{3,15}$/
let regexpassword=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
let regexemail=/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
let regexphone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
let regexage=/\b([1-9]?[0-9])\b/g

//^ sitting wep page
nav.css("left", `-${navInner.width()}px`);
changeSectionWidth()
function changeSectionWidth(){
  let width =window.innerWidth
  let widthNavOut=$(".nav-outer").width() 
  console.log(width);
  console.log(widthNavOut);
  if(width<=776){
    $(".section1").css("width",`${width-widthNavOut}px` )
  }

}
$(window).on('resize', function() {
  nav.css("left", `-${navInner.width()}px`);
  let width =window.innerWidth
  let widthNavOut=$(".nav-outer").width() 
  console.log(width);
  console.log(widthNavOut);
  
$(".section1").css("width",`${width-widthNavOut}px` )
});
$(".moveList").slideUp(10)

//^ EVENTS
let stateSideBar = true;
closeButton.on("click", function () {
  if (stateSideBar === true) {
   
    nav.animate(
      {
        left: 0,
      },
      600
    );
    $(".moveList").slideToggle(800)
    closeButtonIcon1.hide(300);
    closeButtonIcon2.show(700);
    stateSideBar = false;
  } else {
    nav.animate(
      {
        left: -navInner.width(),
      },
      600
    );
    $(".moveList").slideToggle(400)
    closeButtonIcon1.show(700);
    closeButtonIcon2.hide(300);
    stateSideBar = true;
  }
});



//? Home 

async function apiHome(api="") {
  $(".loding").removeClass("d-none")
console.log("hi1")

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${api}`
  );
  console.log("hi2")
  homeApi = await response.json();
  console.log(homeApi)
  $(".loding").addClass("d-none")
  
  console.log("hi3")
  return homeApi.meals;

}
//? Search
search.on("click", function () {
  contentCards.html("");
  $(".inputs").html("")
  $(".inputs").prepend(` 
        <div class="inputs d-flex container row ">
            <input type="text" placeholder="Search by name" class="inputByName col-12 col-md-6 form-control bg-dark text-white btn-outline-dark border-0 m-3 ">
            <input type="text" maxlength="1" placeholder="Search by letter" class="inputByLetter form-control col-12 col-md-6 bg-dark text-white btn-outline-dark border-0 m-3 ">
        </div>

           `);

  let inputByName = $(".inputByName");
  let inputByLetter = $(".inputByLetter");

  inputByName.on("input", function () {
    if (inputByName.val() !== "") {

    startingSearchPage(inputByName.val());
    } else {
      contentCards.html("");
    }
  });

  inputByLetter.on("input", function () {
    if (inputByLetter.val() === "") {
      contentCards.html("");
    } else {
      
      startingSearchPage(inputByLetter.val())
    }
  });
});
//?Categories
Categories.on("click", function () {
  $(".inputs").html("")
  
  async function apiCategori() {
    let response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    homeApi = await response.json();
    await console.log(homeApi.categories);
    function addCardsItem() {
      contentCards.html("");
      

      for (let i = 0; i < homeApi.categories.length; i++) {
        contentCards.append(`
                <div class=" p-2 home col-12 col-sm-6 col-md-4" onclick=' startingSearchPage("${homeApi.categories[i].strCategory}") '>
                   <div class="imge ">
                       <div class="overlay p-2">
                           <span>${homeApi.categories[i].strCategory}</span>
                       </div>
                       <img src="${homeApi.categories[i].strCategoryThumb}" alt="" class="w-100">
                   </div>
                   </div>
               `);
           
      }
      
      
    }
    addCardsItem();
    changeSectionWidth()
    
     return homeApi.categories;
  }
  apiCategori()
});
//? Area
area.on("click", function () {
  $(".inputs").html("")
  apiArea().then(function (responseApi) {
    console.log(responseApi);

    addCardsArea(responseApi);
  });
});

async function apiArea(api = "a") {
  $(".loding").removeClass("d-none")
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?${api}=list`
  );
  homeApi = await response.json();
  $(".loding").addClass("d-none")
  return homeApi.meals;
}

function addCardsArea() {
  contentCards.html("");
  console.log(homeApi.meals);
  $(".loding").addClass("d-none")
  for (let i = 0; i < homeApi.meals.length; i++) {
    contentCards.append(`
                <div class=" p-2 home col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" onclick='apiFoodArea("${homeApi.meals[i].strArea}")'>
                   <div class="imge text-white d-flex flex-column-reverse fs-3 justify-content-center align-items-center">
                       
                           <span class="text-center">${homeApi.meals[i].strArea}</span>
                       
                      <i class="fa-solid fa-house-laptop fa-4x "></i>
                   </div>
                   </div>
               `);
  }
}

  let foodArea;
async function apiFoodArea(api="") {
    $(".loding").removeClass("d-none")
console.log("hi1")
  
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${api}`
  );
  console.log("hi2")
  foodArea = await response.json();

  console.log("hi3")
  console.log(foodArea.meals)
  addCardsFromArea(foodArea.meals);
 
}
//?strat Ingredients
let Ingredients = $(".Ingredients");
Ingredients.on("click", function () {
  $(".inputs").html("")
  apiArea("i").then(function (responseApi) {
    addCardsIngredients(responseApi);
  });
});

function addCardsIngredients(Ingredient){
  contentCards.html("");
  console.log(Ingredient[0]);

  for (let i = 0; i < Ingredient.length<21; i++) {
    let Description=Ingredient[i].strDescription.split(" ")
    console.log(Description);
    
    Description=Description.slice(0,20).join(" ")
    contentCards.append(`
                <div class=" p-2 home col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" onclick='apiFoodIngredients("${Ingredient[i].strIngredient}")'>
                   <div class="imge text-white d-flex flex-column-reverse  justify-content-center align-items-center">
                               <p class="discription">
                                ${Description}
                               </p>
                           <span class="text-center fs-3">${Ingredient[i].strIngredient}</span>
                   
                      <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                  
                   </div>
                   </div>
               `);
  }
}
let foodIngredients;
async function apiFoodIngredients(api="") {
console.log("hi1")
  $(".loding").removeClass("d-none")
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${api}`
  );
  console.log("hi2")
  foodIngredients = await response.json();
  $(".loding").addClass("d-none")
  console.log("hi3")
  console.log(foodIngredients.meals)
  addCardsFromArea(foodIngredients.meals);
 
}

//* Functions
//& <use in search and home and categoriy only for food >
async function addCards(api) {
  $(".loding").addClass("d-none")
  console.log("hi5")
  console.log(api);

  contentCards.html("");
  for (let i = 0; i < api.length; i++) {
    contentCards.append(`
      <div class=" p-2 home col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
         <div class="imge" onclick="detailsMealPage('${api[i].strMeal}')">
             <div class="overlay p-2">
                 <span>${api[i].strMeal}</span>
             </div>
             <img src="${api[i].strMealThumb}" alt="" class="w-100">
         </div>
         </div>
     `);
  }
  changeSectionWidth()
}
//& <use in Area and ingredient only for food>
function addCardsFromArea(responseApi) {
  
  console.log("hi5")
  console.log(responseApi);
  $(".loding").addClass("d-none")
  contentCards.html("");
  for (let i = 0; i < responseApi.length; i++) {
    contentCards.append(`
      <div class="p-2 home col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
         <div class="imge" onclick="detailsMealPage('${responseApi[i].strMeal}')">
             <div class="overlay p-2">
                 <span>${responseApi[i].strMeal }</span>
             </div>
             <img src="${responseApi[i].strMealThumb}" alt="" class="w-100">
         </div>
         </div>
     `);
  }
}


//^ create page detail include component meal 
function CreatePageDetails(apiMeal) {
  console.log(apiMeal);
  contentCards.html(`
          <div class=" d-flex flex-column text-white col-12 col-md-4">
            <img src="${apiMeal.strMealThumb}" alt=""  class="w-100"/>
            <h2>${apiMeal.strMeal}</h2>
          </div>
          <div class="ms-1 col-12 col-md-7 text-white">
            <h2>Instructions</h2>
            <p>
             ${apiMeal.strInstructions}
            </p>
            <div class="h3">
                Area: <span> ${apiMeal.strArea}</span>
            </div>
            <div class="h3">
                Category : <span> ${apiMeal.strCategory}</span>
            </div>
            <div class="h3">
                Recipes :
                <div class="h6 d-flex flex-wrap gap-2 mt-2 text-dark recipes">
               
                
                </div>
            </div>
            <div class=" h3 col-12 ">
              <span class="tags">
              Tags :

              </span>
              <br>
              <span class="mt-3 d-inline-block">
                <a href="${apiMeal.strSource}" class="btn btn-success p-2 h3"  target="_blank">source</a>
                <a href="${apiMeal.strYoutube}" class="btn btn-danger p-2 h3"  target="_blank">Youtube</a>
              </span>
            </div>
          </div>

        `);

  function countOfComponent() {
    let count = 0;
    let flag = true;
    for (let i = 1; (i < 21) & (flag === true); i++) {
      let component = `strMeasure${i}`;
      console.log(apiMeal[component]);

      if (apiMeal[component].trim() === "") {
        flag = false;
        console.log(flag);

        console.log("hello");
      } else {
        count++;
      }
    }
    console.log(count);
    return count;
  }

  function creatComponent() {
    let count = countOfComponent();
    console.log(count);

    for (let i = 1; i <= count; i++) {
      var component = `strMeasure${i}`;
      var component2 = `strIngredient${i}`;
      $(".recipes").append(`
             <span class="bg-info p-1 rounded "><h6 class="p-1"> ${
               apiMeal[component] +
               apiMeal[component2]
             }</h6></span>
            `);
    }
  }

  function checkTags() {
    if (apiMeal.strTags === null) {
      return;
    } else {
      return apiMeal.strTags;
    }
  }
  function creatTage() {
    let tage = checkTags().split(",");
    for (let i = 0; i < tage.length; i++) {
      $(".tags").append(`
           <span class="tageTitle"> ${tage[i]} </span>
              `);
    }
  }

  creatComponent();
  creatTage();
}


function testregex(inputType,regex){
  let Element=$(`.${inputType}`)
  let stateI=regex.test(Element.val())
  if(stateI===true){
    $(`.${inputType}Error`).addClass("d-none")
  }
  else{
    $(`.${inputType}Error`).removeClass("d-none")
  }
  console.log(stateI);
  if(regexname.test($(".name").val()) && regexemail.test($(".email").val()) && regexpassword.test($(".password").val()) && regexage.test($(".age").val())){
    $(".btnForm").removeClass("disabled")
    }
    else{
      $(".btnForm").addClass("disabled")
    }
 
}
function testRepassword(){
  let repassword=$(".Repassword")
  let password=$(".password")
if(repassword.val()===password.val()){
  $(".RepasswordError").addClass("d-none")
 
  console.log(repassword.val());
}
else{
  $(".RepasswordError").removeClass("d-none")
}
if(regexname.test($(".name").val()) && regexemail.test($(".email").val()) && regexpassword.test($(".password").val()) && regexage.test($(".age").val())){
  $(".btnForm").removeClass("disabled")
  }else{
    $(".btnForm").addClass("disabled")
  }
}

//*  contact us
let contactUs=$(".Contact");
contactUs.on("click",function(){
  $(".inputs").html("")
  contentCards.html("");
  contentCards.append(`
    <form action="" class="w-100">
            <div class="contactInput  w-75 d-flex flex-wrap  m-auto">
          <div class="contacti col-12 col-md-6 p-2">
            <input type="text" class=" form-control   w-100 name" placeholder="Enter Your Name"  oninput='testregex("name",${regexname})'/>
            <span class="bg-danger d-none text-white fs-6 w-100 d-inline-block m-auto rounded-3 mt-2 nameError">
            The name must contain more than three letters.
            </span>
          </div>
          <div class="contacti col-12 col-md-6 p-2 ">
            <input type="email" class=" form-control   w-100 email" placeholder="Enter Your Email" oninput='testregex("email",${regexemail})'/>
            <span class="bg-danger d-none text-white fs-6 w-100 d-inline-block m-auto rounded-3 mt-2 emailError">
            Please enter a valid email such as "mail@testing.com"
            </span>
          </div>
          <div class="contacti col-12 col-md-6 p-2 ">
            <input type="text" class=" form-control   w-100 phone" placeholder="Enter Your Phone"  maxlength="11" oninput='testregex("phone",${regexphone})'/>
            <span class="bg-danger d-none text-white fs-6 w-100 d-inline-block m-auto rounded-3 mt-2 phoneError">
            Please enter a valid Phone such as "01000000000"
            </span>
          </div>
          <div class="contacti col-12 col-md-6 p-2">
            <input type="number" class=" form-control   w-100 age" maxlength="2" placeholder="Enter Your Age" min="0" oninput='testregex("age",${regexage})' />
            <span class="bg-danger d-none text-white fs-6 w-100 d-inline-block m-auto rounded-3 mt-2 ageError">
            Please enter Your age
            </span>
          </div>
          <div class="contacti col-12 col-md-6 p-2">
            <input type="password" class=" form-control   w-100 password" placeholder="Enter your password" oninput='testregex("password",${regexpassword})' />
               <span class="bg-danger d-none text-white fs-6 w-100 d-inline-block m-auto rounded-3 mt-2 passwordError">
            Password must contain lowercase and uppercase letters, numbers and special characters "#?!@$ %^&*-"
            </span>
          </div>
          <div class="contacti col-12 col-md-6 p-2">
            <input type="password" class=" form-control   w-100 Repassword" placeholder="Repassword" oninput='testRepassword()'/>
            <span class="bg-danger d-none text-white fs-6 w-100 d-inline-block m-auto rounded-3 mt-2  RepasswordError">
            Retype the password correctly
            </span>
          </div>
          <button class="btn btn-danger disabled m-auto btnForm">Submit</button>
        </div>
        </form>
    `)




}) 

// starting home page
async function startingHomePage(){
  let apiMeal=await apiHome()
  await addCards(apiMeal)
}
// starting search page
async function startingSearchPage (search){
  let apiMeal=await apiHome(search)
  console.log(apiMeal);
  
  await addCards(apiMeal)
}

async function detailsMealPage(meal){
  console.log(meal);
  let apiMeal=await apiHome(meal)
 await CreatePageDetails(apiMeal[0])
  console.log(apiMeal[0]);
  
}

startingHomePage()