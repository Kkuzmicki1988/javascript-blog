{
'use strict';
  /* Pytania do mentora na Piątek 03.07.2020
  - W inspektorze nadawanie i usuwanie klas przy kliknieciu nie dziala jak nalezy.
  - Problem z git. Przy probie zapisania commita otrzymuje komunikat warning "There are too many unreachable loose objects; run 'git prune' to remove them."
    Should I try again? (y/n) wybor Yes powtarza pytanie wybor No zapisuje commit i wszystko dziala poprawnie. O co c'mon :) ?
  - W module jest mowa aby zamykac kod w nawiasach klamrowych. Czy nawiasy klamrowe wstawiac od 1 lini kodu a konczyc na ostatniej ? chodzi przykladowo o use strict
  - Jak wlasciwie dziala this na poczatku funkcji.
  */

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }


    /* NEXT STEP */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector).innerHTML = '';

    /* for each article */
    // mozliwa zamiana argumentu .post na nazwe stalej optArticleSelector
    const articles = document.querySelectorAll('.post');

    for(let article of articles){

    }

      /* get the article id */

      const articleId = element.getAttribute('article');

      /* find the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);
      /* insert link into titleList */
  }

generateTitleLinks();

}
