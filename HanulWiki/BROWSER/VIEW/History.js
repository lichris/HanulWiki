HanulWiki.History = CLASS({

	preset : function() {
		'use strict';

		return VIEW;
	},

	init : function(inner, self) {
		'use strict';
		
		var
		// wrapper
		wrapper = DIV().appendTo(HanulWiki.Layout.getContent());
		
		inner.on('paramsChange', function(params) {
			
			var
			// id
			id = params.id.trim().replace(/ /g, '').toLowerCase().replace(/@!/g, '/'),
			
			// id dom
			idDom;
			
			wrapper.append(H1({
				style : {
					fontSize : 30,
					fontWeight : 'bold'
				},
				c : [idDom = A({
					c : id,
					on : {
						tap : function(e) {
							HanulWiki.GO(id.replace(/\//g, '@!'));
						}
					}
				}), '의 수정 내역']
			}));
			
			GET({
				host : 'tagengine.btncafe.com',
				uri : '__REP_TAG',
				paramStr : 'tag=' + encodeURIComponent(id)
			}, function(id) {
				idDom.empty();
				idDom.append(id);
			});
			
			HanulWiki.ArticleModel.get(id, function(nowArticleData) {
				
				var
				// now article string
				nowArticleString = difflib.stringAsLines(nowArticleData.content);
				
				HanulWiki.ArticleModel.findHistory(id, function(histories) {
					
					EACH(histories, function(history) {
						
						var
						// history article string
						historyArticleString,
						
						// cal
						cal;
						
						if (history.change !== undefined && history.change.content !== undefined) {
							
							historyArticleString = difflib.stringAsLines(history.change.content);
						
							cal = CALENDAR(TIME(history.time));
							
							wrapper.append(DOM({
								style : {
									marginTop : 10
								},
								el : diffview.buildView({
							        baseTextLines: historyArticleString,
							        newTextLines: nowArticleString,
							        opcodes: new difflib.SequenceMatcher(historyArticleString, nowArticleString).get_opcodes(),
							        // set the display titles for each resource
							        baseTextName: cal.getYear() + '년 ' + cal.getMonth() + '월 ' + cal.getDate() + '일 ' + cal.getHour() + '시 ' + cal.getMinute() + '분' + '에 저장된 내용',
							        newTextName: '현재 내용',
							        contextSize: '100%',
							        viewType: 1
							    })
							}));
						}
					});
				});
			});
		});

		inner.on('close', function() {
			wrapper.remove();
		});
	}
});