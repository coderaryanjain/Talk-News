import React, { useState,useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'

import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js';

const alanKey = '32ee04d02e1ae1eef24ccfbfd0af76382e956eca572e1d8b807a3e2338fdd0dc/stage';

 const App = () => {
    const [newsArticles , setNewsArticles]= useState([]);
    const classes=useStyles();
    const [activeArticle,setActiveArticle]=useState(-1);
    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles , number }) => {
                if(command === 'newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command === "highlight"){
                    setActiveArticle((prevActiveArticle)=> prevActiveArticle+1);
                }
                else if(command === 'open'){
                    // console.log(number);
                    const parsedNumber = number.length >2? wordsToNumbers((number),{ fuzzy:true }) : number;
                    // console.log(parsedNumber);
                    const article=articles[parsedNumber-1];
                    
                    if (parsedNumber > 20) {
                        // alanBtn().playText('Please try that again...');
                      } else if (article) {
                        // console.log(article.url);
                        window.open(article.url,"width=300, height=300");
                        // alanBtn().playText('Opening...');
                      }else{
                        console.log('hey');
                        // alanBtn().playText('Sorry couldn\'t open the article...');
                      }
                }
            },
        });
    },[])
return (
    <div> 
        <div className={classes.logoContainer}>
            <img src ="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"/>
        </div>
        <NewsCards articles= {newsArticles} activeArticle={activeArticle}/>
    </div>
);
 
 }
 export default App;
