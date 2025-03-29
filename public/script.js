// let currentStep=0;
// let userInputs={
//     questionTypes: [],
//     numQuestions: 0,
//     shuffle: false,
//     generateAnswers: false,
//     fileFormats: [],
//     fontFile: null
// };
// let nextButton=document.getElementById('qgen');
// let sections=[
//     document.getElementById('question-type-group').parentElement,
//     document.getElementById('question-number-group'),
//     document.getElementById('file-group'),
//     document.getElementById('font-type')
// ];
// function generateAddition(){
//     let a=Math.floor(Math.random()*101);
//     let b=Math.floor(Math.random()*101);
//     return {problem: `\\(${a}+${b}=?\\)`, answer: a+b};
// }
// function generateSubtraction(){
//     let a=Math.floor(Math.random()*101);
//     let b=Math.floor(Math.random()*(a+1));
//     return {problem: `\\(${a}-${b}=?\\)`, answer: a-b};
// }
// function generateMultiplication(){
//     let a=Math.floor(Math.random()*13);
//     let b=Math.floor(Math.random()*13);
//     return {problem: `\\(${a} \\times ${b}=?\\)`, answer: a*b};
// }
// function generateDivision(){
//     let b=Math.floor(Math.random()*10)+1;
//     let quotient=Math.floor(Math.random()*10);
//     let a=b*quotient;
//     return {problem: `\\(${a} \\div ${b}=?\\)`, answer: quotient};
// }
// function generateRoot(){
//     let c=Math.floor(Math.random()*10)+1;
//     let square=c*c;
//     return {problem: `\\(\\sqrt{${square}}=?\\)`, answer: c};
// }
// function shuffleArray(array){
//     for (let i=array.length-1; i>0; i--){
//         let j=Math.floor(Math.random()*(i+1));
//         [array[i], array[j]]=[array[j], array[i]];
//     }
// }
// function generateProblems(types, total){
//     let problems=[];
//     let numPerType=Math.floor(total/types.length);
//     let remainder=total%types.length;
//     types.forEach((type, index)=>{
//         let num=numPerType+(index<remainder?1:0);
//         for (let i=0; i<num; i++){
//             let problem;
//             switch (type){
//                 case 'add':
//                     problem=generateAddition();
//                     break;
//                 case 'subtrt':
//                     problem=generateSubtraction();
//                     break;
//                 case 'mult':
//                     problem=generateMultiplication();
//                     break;
//                 case 'divid':
//                     problem=generateDivision();
//                     break;
//                 case 'root':
//                     problem=generateRoot();
//                     break;
//             }
//            problems.push(problem);
//         }
//     });
//     return problems;
// }
// function generateWorksheet(){
//     let problems=generateProblems(userInputs.questionTypes, userInputs.numQuestions);
//     if (userInputs.shuffle){
//         shuffleArray(problems);
//     }
//     let worksheetHTML='<h2>Math Worksheet</h2><ol>';
//     problems.forEach(p=>{
//         worksheetHTML+=`<li>${p.problem}</li>`;
//     });
//     worksheetHTML+='</ol>';
//     if (userInputs.generateAnswers){
//         worksheetHTML+='<h2>Answers</h2><ol>';
//        problems.forEach(p=>{
//             worksheetHTML+=`<li>${p.answer}</li>`;
//         });
//         worksheetHTML+='</ol>';
//     }
//     let exportHTML='<h3>ExportOptions</h3><p>Below are your selected formats. Right-click the links to save the content, or copy-paste into a file with the appropriate extension. Note: Custom fontapplication requires server-sideprocessing or manual compilation (e.g., XeLaTeX for .tex files).</p><ul>';
//     letplainText=problems.map((p, i)=>`${i+1}. ${p.problem.replace(/\\\(|\\\)/g, '')}${userInputs.generateAnswers?` Answer: ${p.answer}`:''}`).join('\n');
//     let latexText=`\\documentclass{article}\n\\usepackage{amsmath}\n\\begin {document}\n\\section*{Math Worksheet}\n\\begin {enumerate}\n`+problems.map(p=>`    \\item ${p.problem.replace(/\\\(|\\\)/g, '')}`).join('\n')+`\n\\end{enumerate}\n`+(userInputs.generateAnswers?`\\section*{Answers}\n\\begin {enumerate}\n`+problems.map(p=>`    \\item ${p.answer}`).join('\n')+`\n\\end{enumerate}`:'')+`\n\\end{document}`;
//     userInputs.fileFormats.forEach(format=>{
//         let content, filename, mime;
//         switch (format){
//             case 'pdf':
//                 exportHTML+='<li>PDF: Use browser "PrinttopDF" from the displayed worksheetbelow.</li>';
//                 break;
//             case 'txt':
//                 content=plainText;
//                 filename='worksheet.txt';
//                 mime='text/plain';
//                 exportHTML+=`<li><a href="data:${mime};charset=utf-8,${encodeURIComponent(content)}" download="${filename}">${filename}</a></li>`;
//                 break;
//             case 'tex':
//                 content=latexText;
//                 filename='worksheet.tex';
//                 mime='text/x-tex';
//                 exportHTML+=`<li><a href="data:${mime};charset=utf-8,${encodeURIComponent(content)}" download="${filename}">${filename} (Compile with XeLaTeX for custom fontif uploaded)</a></li>`;
//                 break;
//             case 'docx':
//             case 'doc':
//                 exportHTML+=`<li>.${format}: Copy the textfrom the .txtfile into a Word documentand save as .${format}.</li>`;
//                 break;
//         }
//     });
//     exportHTML+='</ul>';
//     if (userInputs.fontFile){
//         exportHTML+=`<p>FontUploaded: ${userInputs.fontFile.name}. To apply it, use the .tex file with XeLaTeX and include the font(requires local setup).</p>`;
//     }
//     let worksheetDiv=document.createElement('div');
//     worksheetDiv.id='worksheet';
//     worksheetDiv.style.margin='20px';
//     worksheetDiv.innerHTML=exportHTML+worksheetHTML;
//     document.body.appendChild(worksheetDiv);
//     document.getElementById('generation-box').style.display='none';
//     MathJax.typeset();
//     letprintButton=document.createElement('button');
//     printButton.textContent='PrintWorksheet';
//     printButton.onclick=()=>window.print();
//     document.body.insertBefore(printButton, worksheetDiv);
// }
// nextButton.addEventListener('click', ()=>{
//     switch (currentStep){
//         case 0:
//             let selectedTypes=Array.from(document.querySelectorAll('input[name="question-type"]:checked')).map(cb=>cb.value);
//             if (selectedTypes.length==0){
//                 alert('Please selectatleastone question type.');
//                 return;
//             }
//             userInputs.questionTypes=selectedTypes;
//             sections[0].style.display='none';
//             sections[1].style.display='block';
//             currentStep++;
//             break;
//         case 1:
//             let numInput=sections[1].querySelector('input[type="number"]');
//             let numQuestions=parseInt(numInput.value);
//             if (isNaN(numQuestions)||numQuestions<=0){
//                 alert('Please enter apositive integer for the number of questions.');
//                 return;
//             }
//             userInputs.numQuestions=numQuestions;
//             userInputs.shuffle=document.getElementById('is-shuffle-questions').checked;
//             userInputs.generateAnswers=document.getElementById('is-generate-answers').checked;
//             sections[1].style.display='none';
//             sections[2].style.display='block';
//             currentStep++;
//             break;
//         case 2:
//             userInputs.fileFormats=Array.from(document.querySelectorAll('input[name="file-type"]:checked')).map(cb=>cb.value);
//             sections[2].style.display='none';
//             sections[3].style.display='block';
//             currentStep++;
//             break;
//         case 3:
//             let fontInput=document.getElementById('font-file');
//             userInputs.fontFile=fontInput.files[0]||null;
//             sections[3].style.display='none';
//             nextButton.style.display='none';
//             generateWorksheet();
//             break;
//     }
// });
