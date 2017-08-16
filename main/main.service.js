

import angular from 'angular';


function AnalyzerService() {

  var exports = {
    beginAnalysis: beginAnalysis
  };

  /**
  * This function will be a driver for the resume analysis piece.
  *
  */

  function beginAnalysis(resumeText, wordList){
    console.log("Analyzer Service: ", resumeText, wordList);

    //make sure resume is lowercase
    resumeText = prepareResume(resumeText);
    //make sure user input is lower case
    wordList = prepareWordList(wordList);
    //get a list of matched words/phrases
    var matchedWords = searchDocument(resumeText, wordList);
    //return the words
    return matchedWords;
  }

  //condition resume text
  function prepareResume(resumeText){
    resumeText = resumeText.toLowerCase();

    return resumeText;
  }
  //condition word list
  function prepareWordList(wordList){
    for(var word in wordList){
      wordList[word] = wordList[word].toLowerCase();
    }

    console.log("lowercase word list: ", wordList);

    return wordList;
  }
  /**
  * Search the resume for key words and phrases.
  * Return an array of words that were found.
  */
  function searchDocument(resumeText, wordList){
    var result = [];
    for(var word in wordList){

      if(resumeText.includes(wordList[word])){
        result.push(wordList[word]);
      }
    }

    console.log("Result from search Document: ", result);
    return result;

  }

  return exports;
}

export default angular.module('resumeReaderApp.main')
  .service('AnalyzerService', AnalyzerService)
  .name;


