'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optAuthorListSelector = '.authors.list',
  optAuthorCloudClassCount = '3',
  optAuthorCloudClassPrefix = 'author-size-';

  

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
 
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  
  /* get 'href' attribute from the clicked link */
  const articleLinkSelector = clickedElement.getAttribute('href'); 

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleLinkSelector);
  
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};


function generateTitleLinks(customSelector = ''){
  
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML='';
  
  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for(let article of articles){
    
    /* get the article id */
    const articleId = article.getAttribute('id');  
    
    /* find title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    
    /* [DONE] use article id and title to create HTML of link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    /* insert link in to the titleList */
    html = html + linkHTML; 
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
/* function calculateTagsParams(tags){
  const params = {
    max: 0,
    min: 999999,
  };
  for(let tag in tags){
    //params.max = tags[tag] > params.max ? tags[tag] : params.max;
    //params.min = tags[tag] < params.min ? tags[tag] : params.min;
    if(tags[tag] > params.max){
      params.max = tags[tag];  
    } else {
      params.min = tags[tag];
    }
  }
  return params;
} */

function getSizeClass(ammount) {
  if(ammount >= 5) return 'tag-size-big';
  else if(ammount >= 3) return 'tag-size-medium';
  else if(ammount >= 2) return 'tag-size-small';
  else return 'tag-size-very-small';
} 

function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  console.log(allTags);
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles){  
    
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    
    /* make html variable with empty string */
    let html = '';
    
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag +'">' + tag + '</a></li> ';  
      
      /* add generated code to html variable */
      html = html + linkHTML;
      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag] ++;
      }
    }/* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
    
  }/* END LOOP: for every article: */ 
  
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */
  //const tagsParams = calculateTagsParams(allTags);
  //console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')' + '</a></li> ';
    allTagsHTML += `<li><a href="#tag-${tag}" class="${getSizeClass(allTags[tag])}"> ${tag} </a></li>`;
    
  }/* [NEW] END LOOP: for each tag in allTags: */
  /* [NEW] add HTML from allTagsHTML to AllTags */
  tagList.innerHTML = allTagsHTML;

}
generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  
  /* START LOOP: for each active tag link */
  for(let activeTagLink of activeTagLinks){
    /* remove class active */
    activeTagLink.classList.remove('active');   

  }/* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  /* START LOOP: for each found tag link */
  for(let foundTagLink of foundTagLinks){
    foundTagLink.classList.add('active');

    /* add class active */
  }/* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  
  /* START LOOP: for each link */
  for(let link of tagLinks){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  }/* END LOOP: for each link */
}
addClickListenersToTags();

function calculateAuthorsParams(authors) {
  const params = {
    'max' : 0,
    'min' : 999999
  };

  for(let articleAuthor in authors){
    console.log(articleAuthor + ' is used ' + authors[articleAuthor] + ' times');
    if(authors[articleAuthor] > params.max){
      params.max = authors[articleAuthor];
    }
    if(authors[articleAuthor] < params.min){
      params.min = authors[articleAuthor];
    }
  }
  return params;
}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classnumber = Math.floor( percentage * (optAuthorCloudClassCount - 1) + 1);
  return optAuthorCloudClassPrefix + classnumber;
}


function generateAuthors(){
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for(const article of articles){
    
    /* find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    
    /* make html variable with empty string */
    let html ='';
    
    /* get author from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    
    /* generate HTML of the link */
    //const linkHTML = '<li><a href="#author-' + articleAuthor +'">' + 'by ' + articleAuthor + '</a></li> ';
    const linkHTMLData = {id: articleAuthor, author: articleAuthor};
    const linkHTML = templates.authorLink(linkHTMLData);
    
    /* add generated code to html variable */
    html = html + linkHTML;
    
    /* [NEW] check if this link is NOT already in allAuthors */
    if(!allAuthors.hasOwnProperty(articleAuthor)){
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;
 
  }/* END LOOP: for every article: */ 
  
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorListSelector);

  /* [NEW] create variable for all links HTML code */
  const authorsParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams: ', authorsParams);
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for(let articleAuthor in allAuthors){

    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    allAuthorsData.authors.push({
      author: articleAuthor,
      count: allAuthors[articleAuthor],
      className: calculateAuthorClass(allAuthors[articleAuthor], authorsParams)
    });

  /* [NEW] END LOOP: for each author in allAuthors: */
  }
  /* [NEW] add html for allAuthorsHTML to authorList */
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('allAuthorsData:', allAuthorsData);
}

generateAuthors();


function authorClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for(let authorLink of authorLinks){

    /* remove class active */
    authorLink.classList.remove('active');

  }/* END LOOP: for each active author link */
  /* find all author links with "href" attribute equal to the "href" constant */
  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */
  for(let foundAuthorLink of foundAuthorLinks){
    /* add class active */
    foundAuthorLink.classList.add('active');

  }/* END LOOP: for each found author link */
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {

  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let link of links){
    
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickHandler);

  }/* END LOOP: for each link */
}
addClickListenersToAuthors();
