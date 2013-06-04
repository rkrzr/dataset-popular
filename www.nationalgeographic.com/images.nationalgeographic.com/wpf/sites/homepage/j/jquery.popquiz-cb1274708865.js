(function($) {
	$.fn.ngpopquiz = function(settings) {
		settings = $.extend({
			appurl:'/leaderboard/quiz/',
			userxml:'get_logged_user/?tcache=',//http://leaderboard.nationalgeographic.com/natgeo/quiz/get_logged_user/?tcache=1265899079705
			quizlistxml:'get_quiz_list/Homepage/', //http://leaderboard.nationalgeographic.com/natgeo/quiz/get_quiz_list/Homepage/
			quizxml:'get_quiz/Homepage/', //http://leaderboard.nationalgeographic.com/natgeo/quiz/get_quiz/Homepage/Quiz%208:%20Jan.%202010
			answeredxml:'get_answers/', //http://leaderboard.nationalgeographic.com/natgeo/quiz/get_answers/stefan/Quiz%208:%20Jan.%202010/?tcache=1265899082385
			responsexml:'set_answer/', //http://leaderboard.nationalgeographic.com/natgeo/quiz/set_answer/stefan/Quiz%208:%20Jan.%202010/32/C
			leaderboardurl:'http://leaderboard.nationalgeographic.com/natgeo/leaderboard/highscores/'
		}, settings);
		
		$(this).each(function(){
			var quiz = $(this);
			var quizList;
			var qData;
			var username = 'None';
			var currQ = 0;
			var selQ = 0;
			var selChoice = 'a';
			var quizname;
			var foTime = 1000;
			var fiTime = 500;
			var maxQs = 40;
			var answered = new Array(maxQs);
			var currAnswered = answered;
			var isPrevQuiz = false;
			var todaysdate = new Date();
			
			$(quiz).find('#popquiz_body').fadeIn(1);
			
			$.get(settings.appurl+settings.userxml+todaysdate.getTime(), function(data){
				username = $(data).text().replace('<username>','').replace('</username>','');
				if(username != 'None'){
					ngsCustomEvent('hpquizlogin');
					$(quiz).find('#logged_in').show();
					$(quiz).find('#quiz_help_panel p:last').hide();
					$.get(settings.quizlistxml, function(data){	 
						quizList = data;
						quizname = $($(data).find('quiz')[0]).find('name').text();
						$.get(settings.appurl+settings.answeredxml+username+'/'+quizname+'/?tcache='+todaysdate.getTime(), function(data){
							$(data).find('answer').each(function(){
								answered[$(this).find('question').text()-1] = $(this).find('choice').text().toLowerCase();
							});
							getQuizData();
						});
					},'xml');
				}
				else {
					$.get(settings.appurl+settings.quizlistxml, function(data){
						quizList = data;
						quizname = $($(data).find('quiz')[0]).find('name').text();
						getQuizData();
						$(quiz).find('#not_logged_in').show();
					},'xml');
				}
			},'text');
			
			function getQuizData(){
				$(quiz).find('#answer_links a:last').attr('href',settings.leaderboardurl+quizname+'/');
				$(quiz).find('#more_links a:last').attr('href',settings.leaderboardurl+quizname+'/');
				
				var prevQuizzes = $(quiz).find('#prev_questions #prev_quizzes ul');
				var months = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
				var counter = 1;
				
				$(quizList).find('quiz').each(function(){
					var qname = $(this).find('name').text();
					if(quizname == qname) return;
					var date =  $(this).find('end').text().split('-');
					var formattedDate = months[date[1]-1]+' '+date[2].replace(/^0/,'')+', '+date[0];
					
					$(prevQuizzes).append("<li><p><a href='#' rel='"+counter+"'>"+qname+"</a> ended "+formattedDate+"</p></li>");
					$(prevQuizzes).find('li:last a').bind('click',function(event){
						populateQuiz($(this).attr('rel'));
						backToQuestion();
						event.preventDefault();
					});
					counter++;
				});
				
				currQ = $($(quizList).find('quiz')[0]).find('question').text()-1;
				selQ = currQ;
				if(currQ == 0) $(quiz).find('div.arrows').hide();
				$(quiz).find('#question_nav p').text(currQ+1);
				$.get(settings.appurl+settings.quizxml+quizname+'/',function(data){
					qData = data;
					gotoQuestion();
				},'xml');
			}
			
			function populateQuiz(index){
				var thequiz = $(quizList).find('quiz')[index];
				var qname = $(thequiz).find('name').text();
				
				if(quizname == qname){
					isPrevQuiz = false;
					currQ = $(thequiz).find('question').text()-1;
					answered = currAnswered;
				}
				else {
					answered = new Array(40);
					isPrevQuiz = true;
					currQ = maxQs-1;
					selQ = currQ;
				}
				$.get(settings.appurl+settings.quizxml+qname+'/',function(data){
					qData = data;
					gotoQuestion();
				},'xml');
			}
			
			$(quiz).find('#quiz_help_btn a').bind('click', function(event){
				$(quiz).find('#quiz_help_panel').css('min-height',$(quiz).height()-50);
				$(quiz).find('#quiz_help_panel').fadeIn(fiTime);
				event.preventDefault();
			});
			
			$(quiz).find('#quiz_help_panel .close_btn a').bind('click', function(event){
				$(quiz).find('#quiz_help_panel').fadeOut(foTime);
				event.preventDefault();
			});
			
			$(quiz).find('#quiz_submit_btn a').bind('click', function(event){
				var selected = $(quiz).find('#question_body li a.selected').attr('rel');
				
				if(selected != undefined){
					answered[selQ] = selected;
					populateAnswer(answered[selQ],true);
					$(quiz).find('#question_body').fadeOut(foTime);
					$(quiz).find('#quiz_submit_btn').fadeOut(foTime, function(){
						$(quiz).find('#answer_body').fadeIn(fiTime);
						$(quiz).find('#answer_links').fadeIn(fiTime);
						$(quiz).find('#prev_questions_btn').fadeIn(fiTime);
					});
					ngsCustomEvent('hpquizcompletion');
				}
				else {
					$(quiz).find('#need_answer').show(500);
					setTimeout(hideNeedAnswer,2500);
				}
				event.preventDefault();
			});
			
			function hideNeedAnswer(){
				$(quiz).find('#need_answer').hide(500);
			}
			
			$(quiz).find('#prev_questions_btn a').bind('click', function(event){
				gotoPrevQuestions();
				event.preventDefault();
			});
			
			$(quiz).find('#prev_question').bind('click', function(event){
				selQ--;
				if(selQ < 0) selQ = currQ;
				gotoQuestion();
				event.preventDefault();
			});
			
			$(quiz).find('#next_question').bind('click', function(event){
				selQ++;
				if(selQ > currQ) selQ = 0;
				gotoQuestion();
				event.preventDefault();
			});
			
			function gotoQuestion(){
				$(quiz).find('#question_nav p').text(selQ+1);
				if(selQ == currQ && !isPrevQuiz) $(quiz).find('h4:first').text("Today's Question");
				else $(quiz).find('h4:first').text('Question '+(selQ+1)+' of '+(currQ+1));
				
				if($(quiz).find('#question_body').css('display') != 'none'){
					$(quiz).find('#question_body').fadeOut(foTime, function(){
						fadeInQA();
					});
				}
				else $(quiz).find('#question_body').fadeOut(foTime);
				$(quiz).find('#quiz_submit_btn').fadeOut(foTime);
				$(quiz).find('#answer_body').fadeOut(foTime);
				$(quiz).find('#answer_links').fadeOut(foTime);
				$(quiz).find('#user_score').fadeOut(foTime);
				if($(quiz).find('#prev_questions_btn').css('display') != 'none'){
					$(quiz).find('#prev_questions_btn').fadeOut(foTime, function(){
						fadeInQA();
					});
				}
				else {
					$(quiz).find('#prev_questions_btn').fadeOut(foTime);
				}
			}
			
			function gotoQuestionNow(){
				$(quiz).find('#question_nav p').text(selQ+1);
				if(selQ == currQ) $(quiz).find('h4:first').text("Today's Question");
				else $(quiz).find('h4:first').text('Question '+(selQ+1)+' of '+(currQ+1));
				
				$(quiz).find('#question_body').hide();
				$(quiz).find('#quiz_submit_btn').hide();
				$(quiz).find('#answer_body').hide();
				$(quiz).find('#answer_links').hide();
				$(quiz).find('#user_score').hide();
				$(quiz).find('#prev_questions_btn').hide();
				fadeInQA();
			}
			
			function fadeInQA(){
				if(answered[selQ] != undefined){
					$(quiz).find('#answer_body').fadeIn(fiTime);
					$(quiz).find('#answer_links').fadeIn(fiTime);
					$(quiz).find('#prev_questions_btn').fadeIn(fiTime);
					populateAnswer(answered[selQ]);
				}
				else {
					$(quiz).find('#question_body').fadeIn(fiTime);
					$(quiz).find('#quiz_submit_btn').fadeIn(fiTime);
					populateQuestion(selQ);
				}
			}
			
			function populateQuestion(num){
				var question = $(qData).find('questions').find('question')[num];
				var choices = $(question).find('choices');
				var choice;
				var content = jQuery("<div>"+$(question).find('content').text()+"</div>").html();
				
				$(quiz).find('#question_body').html(content+'<ul></ul>');
				choice = jQuery("<div>"+$(choices).find('a').text().replace('<p>','').replace('</p>','')+"</div>").html();
				if(choice.length > 2) $(quiz).find('#question_body ul').append("<li><a href='#' rel='a'>"+choice+"</a></li>");
				choice = jQuery("<div>"+$(choices).find('b').text().replace('<p>','').replace('</p>','')+"</div>").html();
				if(choice.length > 2) $(quiz).find('#question_body ul').append("<li><a href='#' rel='b'>"+choice+"</a></li>");
				choice = jQuery("<div>"+$(choices).find('c').text().replace('<p>','').replace('</p>','')+"</div>").html();
				if(choice.length > 2) $(quiz).find('#question_body ul').append("<li><a href='#' rel='c'>"+choice+"</a></li>");
				choice = jQuery("<div>"+$(choices).find('d').text().replace('<p>','').replace('</p>','')+"</div>").html();
				if(choice.length > 2) $(quiz).find('#question_body ul').append("<li><a href='#' rel='d'>"+choice+"</a></li>");
				
				$(quiz).find('#question_body li a').each(function(data){
					$(this).bind('click',function(event){
						$(quiz).find('#question_body li a').removeClass('selected');
						$(this).addClass('selected');
						event.preventDefault();
					});
				});
			}
			
			function populateAnswer(selected, firsttime){
				var question = $(qData).find('questions').find('question')[selQ];
				var correctChoice = $(question).find('answer').text().toLowerCase().replace(/^\s+|\s+$/g,'');
				var correctAnswer = $(question).find('choices').find(correctChoice).text();
				var explanation = jQuery("<div>"+$(question).find('explanation').text()+"<p><em>Answer:</em> "+correctAnswer+"</p></div>").html();
				
				if(firsttime){
					if(correctChoice == selected){
						$(quiz).find('#answer_body h4').text('Correct!');
						$(quiz).find('#answer_body span').attr('class','correct');
					}
					else {
						$(quiz).find('#answer_body h4').text('Incorrect');
						$(quiz).find('#answer_body span').attr('class','incorrect');
					}
					$(quiz).find('#answer_body h4').show();
					$(quiz).find('#answer_body span').show();
					$(quiz).find('#answer_body p.result').hide();
					$(quiz).find('#answer_links a:first').show();
				}
				else {
					$(quiz).find('#answer_body h4').hide();
					$(quiz).find('#answer_body span').hide();
					if(correctChoice == answered[selQ]) $(quiz).find('#answer_body p.result').html("<span class='correct'></span> <em>You answered this question correctly.</em>");
					else $(quiz).find('#answer_body p.result').html("<span class='incorrect'></span> <em>You answered this question incorrectly.</em>");
					$(quiz).find('#answer_body p.result').show();
					$(quiz).find('#answer_links a:first').hide();
				}
				
				$(quiz).find('#answer_body p.answer').html(explanation);
				
				if(username != 'None' && !isPrevQuiz){
					$(quiz).find('#answer_links a:first').hide();
					$.get(settings.appurl+settings.responsexml+username+'/'+quizname+'/'+(selQ+1)+'/'+selected.toUpperCase()+'/', function(data){
						var stars = $(data).find('stars').text()/2;
						var starField = $(quiz).find('#user_score li');
						
						$(quiz).find('#answer_links p').text($(data).find('ratio').text().replace(/^\s+|\s+$/g,'')+'% of users answered this question correctly');
						$(quiz).find('#user_score p').text('Your Daily Quiz Score: '+$(data).find('score').text());
						for(var i=0; i < 5; i++){
							if(i <= Math.floor(stars)-1) $(starField[i]).attr('class','full');
							else if(i == Math.floor(stars) && stars-Math.floor(stars) >= .5) $(starField[i]).attr('class','half');
							else $(starField[i]).attr('class','empty');
						}
						$(quiz).find('#user_score').fadeIn(fiTime);
					},'xml');
				}
				else {
					if(!isPrevQuiz) $(quiz).find('#answer_links a:first').show();
					else $(quiz).find('#answer_links a:first').hide();
					$(quiz).find('#answer_links p').text($(question).find('ratio').text().replace(/^\s+|\s+$/g,'')+'% of users answered this question correctly');
				}
			}
			
			//previous questions
			
			$(quiz).find('#more_links a:first').bind('click', function(event){
				gotoPrevQuestions();
				event.preventDefault();
			});
			
			$(quiz).find('#more_links a:eq(1)').bind('click', function(event){
				if(isPrevQuiz){
					populateQuiz(0);
				}
				selQ = currQ;
				backToQuestion();
				event.preventDefault();
			});
			
			function gotoPrevQuestions(){
				populatePrevQuestions();							   
				$(quiz).find('#popquiz_body').fadeOut(foTime, function(){
					$(quiz).find('#prev_questions').fadeIn(fiTime);
					$(quiz).find('#more_links p:eq(1)').fadeIn(fiTime);
					$(quiz).find('#quiz_help_btn').fadeIn(fiTime);
				});
				$(quiz).find('#quiz_help_btn').fadeOut(foTime);
				$(quiz).find('#prev_questions_btn').fadeOut(foTime);
				$(quiz).find('#quiz_submit_btn').fadeOut(foTime);
				$(quiz).find('#more_links p:first').fadeOut(foTime);
			}
			
			$(quiz).find('#prev_questions h4 a').bind('click', function(event){
				if(isPrevQuiz){
					populateQuiz(0);
				}
				selQ = currQ;
				backToQuestion();
				event.preventDefault();
			});
			
			$(quiz).find('#question_tabs a.tab1').bind('click', function(event){
				$('#popquiz #prev_questions div#question_tabs').attr('class','unanswered');
				populatePrevQuestions('unanswered');
				event.preventDefault();
			});
			$(quiz).find('#question_tabs a.tab2').bind('click', function(event){
				$('#popquiz #prev_questions div#question_tabs').attr('class','all');
				populatePrevQuestions('all');
				event.preventDefault();
			});
			
			function backToQuestion(){
				gotoQuestionNow();
				$(quiz).find('#quiz_help_btn').fadeOut(foTime);
				if(!isPrevQuiz) $(quiz).find('#more_links p:eq(1)').fadeOut(foTime);
				$(quiz).find('#prev_questions').fadeOut(foTime,function(){
					$(quiz).find('#popquiz_body').fadeIn(fiTime);
					$(quiz).find('#more_links p:first').fadeIn(fiTime);
					$(quiz).find('#quiz_help_btn').fadeIn(fiTime);
				});
			}
			
			function populatePrevQuestions(mode){
				if(mode == undefined) mode = 'all';
				var box = $(quiz).find('#prev_questions ul:first');
				var counter=0;
				
				box.html('');
				$(qData).find('questions').find('question').each(function(){
					if(counter > currQ) return;
					counter++;
					if(mode != 'unanswered' || answered[counter-1] == undefined){
						var content = jQuery("<div>"+$(this).find('content').text()+"</div>").html();
						var correctChoice = $(this).find('answer').text().toLowerCase().replace(/^\s+|\s+$/g,'');
						var result = '<div class="result">';
						var done = true;
						
						if(answered[counter-1] == undefined){
							result += '<p><a href="#" rel="'+counter+'">Answer this Question</a></p>';
							$(quiz).find('#prev_questions .result a').bind('click', function(event){
								selQ = $(this).attr('rel')-1;
								backToQuestion();
								event.preventDefault();
							});
							done = false;
						}
						else if(correctChoice == answered[counter-1]){
							result += '<span class="correct"></span><p><em>You answered this question correctly.</em></p>';
						}
						else {
							result += '<span class="incorrect"></span><p><em>You answered this question incorrectly.</em></p>';
						}
						result += '</div>';
						box.append('<li><div class="number"><p>'+counter+'</p></div><div class="question"><p>'+content+'</p></div><div style="clear:both;"></div>'+result+'</li>');
						if(done) box.find('li:last').fadeTo(0,0.6);
					}
				});
				
				if(mode == 'all') $(quiz).find('div#prev_quizzes').show();
				else $(quiz).find('div#prev_quizzes').hide();
			}

			return this;
		});
	}
})(jQuery);

$(document).ready(function(){$('#popquiz').ngpopquiz({});});