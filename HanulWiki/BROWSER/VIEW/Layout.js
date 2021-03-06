HanulWiki.Layout = CLASS(function(cls) {
	'use strict';

	var
	// license style
	licenseStyle = {
		fontSize : 12,
		marginTop : 10
	},
	
	// is authed
	isAuthed = false,
	
	// content
	content,
	
	// check is authed.
	checkIsAuthed,
	
	// get content.
	getContent;
	
	cls.checkIsAuthed = checkIsAuthed = function() {
		return isAuthed;
	};
	
	cls.getContent = getContent = function() {
		return content;
	};

	return {

		preset : function() {
			return VIEW;
		},

		init : function(inner, self) {

			var
			// scroll store
			scrollStore = HanulWiki.STORE('scroll'),
			
			// password store
			passwordStore = HanulWiki.STORE('passwordStore'),
			
			// auth room
			authRoom = HanulWiki.ROOM('authRoom'),
			
			// connection room
			connectionRoom = HanulWiki.ROOM('connectionRoom'),
			
			// on new article room
			onNewArticleRoom,
			
			// tap event
			tapEvent = EVENT('tap', function() {
				if (searchResult !== undefined) {
					searchResult.remove();
					searchResult = undefined;
				}
			}),
			
			// header
			header,
			
			// menu
			menu,
			
			// count dom
			countDom,
			
			// connection count dom
			connectionCountDom,
			
			// footer
			footer,
			
			// search result
			searchResult,
			
			// layout
			layout = DIV({
				style : {
					backgroundColor : '#fff',
					color : '#000'
				},
				c : [header = UUI.PANEL({
					style : {
						backgroundColor : CONFIG.HanulWiki.baseColor,
						color : '#fff',
						fontWeight : 'bold'
					},
					contentStyle : {
						margin : 'auto',
						onDisplayResize : function(width, height) {
							return {
								width : width >= 1024 ? 926 : '100%'
							};
						}
					}
				}),
				
				content = UUI.PANEL({
					style : {
						margin : 'auto',
						onDisplayResize : function(width, height) {
							return {
								width : width >= 1024 ? 946 : '100%'
							};
						}
					},
					contentStyle : {
						padding : 10
					}
				}),
				
				footer = UUI.PANEL({
					style : {
						borderTop : '1px solid #ccc',
						backgroundColor : '#eee',
						padding : '0 10px 10px 10px'
					},
					contentStyle : {
						margin : 'auto',
						onDisplayResize : function(width, height) {
							return {
								width : width >= 1024 ? 926 : '100%'
							};
						}
					}
				})]
			}).appendTo(BODY);
				
			if (CONFIG.HanulWiki.license === 'CC BY') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by/4.0/',
						c : IMG({
							src : HanulWiki.R('ccl-by.png')
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by/4.0/',
						c : '크리에이티브 커먼즈 저작자표시 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-SA') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-sa/4.0/',
						c : IMG({
							src : HanulWiki.R('ccl-by-sa.png')
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-sa/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-ND') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nd/4.0/',
						c : IMG({
							src : HanulWiki.R('ccl-by-nd.png')
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nd/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-변경금지 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-NC') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nc/4.0/',
						c : IMG({
							src : HanulWiki.R('ccl-by-nc.png')
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nc/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-비영리 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-NC-SA') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
						c : IMG({
							src : HanulWiki.R('ccl-by-nc-sa.png')
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nc-sa/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-비영리-동일조건변경허락 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			else if (CONFIG.HanulWiki.license === 'CC BY-NC-ND') {
				footer.append(DIV({
					style : licenseStyle,
					c : [A({
						href : 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
						c : IMG({
							src : HanulWiki.R('ccl-by-nc-nd.png')
						})
					}), BR(), '이 저작물은 ', A({
						href : 'http://creativecommons.org/licenses/by-nc-nd/4.0/',
						c : '크리에이티브 커먼즈 저작자표시-비영리-변경금지 4.0 국제 라이선스'
					}), '에 따라 이용할 수 있습니다.']
				}));
			}
			
			if (CONFIG.HanulWiki.copyright !== undefined) {
				footer.append(DIV({
					style : licenseStyle,
					c : CONFIG.HanulWiki.copyright
				}));
			}
			
			footer.append(DIV({
				style : licenseStyle,
				c : [CONFIG.title + '는 ', A({
					target : '_blank',
					href : 'https://github.com/Hanul/HanulWiki',
					c : '하늘 위키'
				}), '를 기반으로 합니다. ', A({
					target : '_blank',
					href : 'https://github.com/Hanul/HanulWiki',
					c : '하늘 위키'
				}), '는 오픈소스 소프트웨어 입니다.']
			}));
			
			authRoom.send({
				methodName : 'auth',
				data : passwordStore.get('password')
			}, function(_isAuthed) {
				
				isAuthed = _isAuthed;
				
				if (inner.checkIsClosed() !== true) {
					
					if (CONFIG.HanulWiki.logo !== undefined) {
					
						header.append(IMG({
							style : {
								flt : 'left',
								cursor : 'pointer'
							},
							src : HanulWiki.R(CONFIG.HanulWiki.logo),
							on : {
								tap : function() {
									scrollStore.remove('top');
									HanulWiki.GO('');
								}
							}
						}));
					}
					
					header.append(H1({
						style : {
							flt : 'left',
							padding : 10,
							cursor : 'pointer',
							fontWeight : 'bold'
						},
						c : CONFIG.title,
						on : {
							tap : function() {
								scrollStore.remove('top');
								HanulWiki.GO('');
							}
						}
					}));
				
					header.append(FORM({
						style : {
							flt : 'left'
						},
						c : [UUI.FULL_INPUT({
							style : {
								margin : '5px 0',
								flt : 'left',
								width : 120
							},
							name : 'id',
							on : {
								keyup : function(e, input) {
									
									var
									// key code
									keyCode = e.getKeyCode(),
									
									// now id
									nowId,
									
									// now id dom
									nowIdDom,
									
									// keydown event
									keydownEvent;
									
									if (keyCode === 27) {
										
										if (searchResult !== undefined) {
											searchResult.remove();
										}
										
									} else if (keyCode !== 40 && keyCode !== 38) {
										
										if (searchResult !== undefined) {
											searchResult.remove();
										}
										
										if (input.getValue().trim() !== '') {
										
											keydownEvent = EVENT('keydown', function(e) {
												
												var
												// key code
												keyCode = e.getKeyCode(),
												
												// i
												i;
												
												if (searchResult.getChildren().length > 0) {
													
													if (keyCode === 40) {
														
														if (nowIdDom === undefined) {
															nowIdDom = searchResult.getChildren()[0];
														} else {
															nowIdDom.addStyle({
																backgroundColor : '#eee'
															});
															
															i = FIND({
																array : searchResult.getChildren(),
																value : nowIdDom
															}) + 1;
															
															if (i >= searchResult.getChildren().length) {
																nowIdDom = undefined;
															} else {
																nowIdDom = searchResult.getChildren()[i];
															}
														}
														
														if (nowIdDom !== undefined) {
															nowIdDom.addStyle({
																backgroundColor : '#ccc'
															});
														}
														
													} else if (keyCode === 38) {
														
														if (nowIdDom === undefined) {
															nowIdDom = searchResult.getChildren()[searchResult.getChildren().length - 1];
														} else {
															nowIdDom.addStyle({
																backgroundColor : '#eee'
															});
															
															i = FIND({
																array : searchResult.getChildren(),
																value : nowIdDom
															}) - 1;
															
															if (i < 0) {
																nowIdDom = undefined;
															} else {
																nowIdDom = searchResult.getChildren()[i];
															}
														}
														
														if (nowIdDom !== undefined) {
															nowIdDom.addStyle({
																backgroundColor : '#ccc'
															});
														}
														
													} else if (keyCode === 13 && nowIdDom !== undefined) {
														input.setValue('');
														HanulWiki.GO(HanulWiki.escapeId(nowIdDom.getData().id));
													}
												}
											});
										
											searchResult = DIV({
												style : {
													position : 'absolute',
													left : input.getLeft(),
													top : input.getTop() + input.getHeight(),
													backgroundColor : '#eee',
													color : '#000'
												},
												on : {
													remove : function() {
														keydownEvent.remove();
														keydownEvent = undefined;
													}
												}
											}).appendTo(BODY);
											
											HanulWiki.ArticleModel.searchIds(input.getValue(), EACH(function(id) {
												
												var
												// button
												button;
												
												if (keydownEvent !== undefined) {
												
													searchResult.append(button = UUI.BUTTON_H({
														style : {
															border : '1px solid #ccc',
															marginBottom : -1,
															padding : 5
														},
														c : id,
														on : {
															tap : function() {
																HanulWiki.GO(HanulWiki.escapeId(id));
															}
														}
													}));
													
													button.setData({
														id : id
													});
												}
											}));
										}
									}
								}
							}
						}), UUI.FULL_SUBMIT({
							style : {
								margin : '5px 0',
								flt : 'left',
								width : 50,
								padding : 5,
								backgroundColor : '#ccc'
							},
							value : '이동'
						}), CLEAR_BOTH()],
						on : {
							submit : function(e, form) {
								
								var
								// id
								id = form.getData().id.trim();
								
								if (id !== '') {
									HanulWiki.GO(HanulWiki.escapeId(id));
									form.setData({});
								}
							}
						}
					}));
					
					header.append(menu = DIV({
						style : {
							flt : 'left'
						}
					}));
					
					menu.append(UUI.BUTTON_H({
						style : {
							marginLeft : 10,
							flt : 'left',
							padding : 10
						},
						title : '처음으로',
						href : HanulWiki.HREF(''),
						on : {
							tap : function() {
								scrollStore.remove('top');
								HanulWiki.GO('');
							}
						}
					}));
					
					menu.append(UUI.BUTTON_H({
						style : {
							flt : 'left',
							padding : 10
						},
						title : isAuthed === true ? '글 작성' : '로그인',
						on : {
							tap : function() {
								HanulWiki.GO(isAuthed === true ? 'func/new' : 'func/login');
							}
						}
					}));
					
					if (isAuthed === true) {
					
						menu.append(UUI.BUTTON_H({
							style : {
								flt : 'left',
								padding : 10
							},
							title : '토론',
							href : HanulWiki.HREF('func/talk'),
							on : {
								tap : function() {
									HanulWiki.GO('func/talk');
								}
							}
						}));
					}
					
					menu.append(UUI.BUTTON_H({
						style : {
							flt : 'left',
							padding : 10
						},
						title : '랜덤',
						on : {
							tap : function() {
								HanulWiki.ArticleModel.get({
									isRandom : true
								}, function(articleData) {
									HanulWiki.GO(HanulWiki.escapeId(articleData.id));
								});
							}
						}
					}));
					
					menu.append(CLEAR_BOTH());
					
					header.append(countDom = DIV({
						style : {
							flt : 'right',
							padding : 10
						},
						title : '전체 항목 수: 로딩중...'
					}));
					
					HanulWiki.ArticleModel.count(function(count) {
						if (inner.checkIsClosed() !== true) {
							countDom.empty();
							countDom.append('전체 항목 수: ' + count);
							
							onNewArticleRoom = HanulWiki.ArticleModel.onNew(function(newArticleData) {
								
								var
								// panel
								panel,
								
								// article link
								articleLink;
								
								count += 1;
								
								countDom.empty();
								countDom.append('전체 항목 수: ' + count);
								
								panel = UUI.PANEL({
									style : {
										position : 'fixed',
										right : 10,
										bottom : 10,
										border : '1px solid #000',
										backgroundColor : '#eee',
										color : '#000',
										boxShadow : '1px 1px 1px #000'
									},
									contentStyle : {
										padding : '5px 10px'
									},
									c : ['새 항목: ', articleLink = A({
										style : {
											color : CONFIG.HanulWiki.baseColor
										},
										c : newArticleData.id,
										on : {
											tap : function() {
												HanulWiki.GO(HanulWiki.escapeId(newArticleData.id));
											}
										}
									})]
								}).appendTo(BODY);
								
								UANI.SLIDE_UP_SHOW({
									node : panel
								});
								
								GET({
									host : 'tagengine.btncafe.com',
									uri : '__REP_TAG',
									paramStr : 'tag=' + encodeURIComponent(newArticleData.id)
								}, function(id) {
									if (panel !== undefined) {
										articleLink.empty();
										articleLink.append(id);
									}
								});
								
								DELAY(5, function() {
									
									UANI.SLIDE_DOWN_HIDE({
										node : panel
									}, function() {
									
										panel.remove();
										panel = undefined;
									});
								});
							});
						}
					});
					
					header.append(connectionCountDom = DIV({
						style : {
							flt : 'right',
							padding : 10
						},
						title : '접속중인 유저 수: 로딩중...'
					}));
			
					connectionRoom.send({
						methodName : 'getConnectionCount'
					}, function(count) {
						
						if (inner.checkIsClosed() !== true) {
							
							connectionCountDom.empty();
							connectionCountDom.append('접속중인 유저 수: ' + count);
							
							connectionRoom.on('newUser', function() {
								count += 1;
								connectionCountDom.empty();
								connectionCountDom.append('접속중인 유저 수: ' + count);
							});
							
							connectionRoom.on('leaveUser', function() {
								count -= 1;
								connectionCountDom.empty();
								connectionCountDom.append('접속중인 유저 수: ' + count);
							});
						}
					});
					
					header.append(CLEAR_BOTH());
				}
			
				inner.on('uriChange', function(uri) {
					if (CONFIG.HanulWiki.isPrivate === true && isAuthed !== true && uri !== 'func/login') {
						HanulWiki.GO('func/login');
					}
				});
				
				HanulWiki.ArticleModel.get({
					sort : {
						createTime : 1
					}
				}, function(firstArticleData) {
					if (inner.checkIsClosed() !== true) {
						footer.before(UUI.PANEL({
							style : {
								margin : 'auto',
								onDisplayResize : function(width, height) {
									return {
										width : width >= 1024 ? 946 : '100%'
									};
								}
							},
							contentStyle : {
								fontSize : 12,
								color : '#666',
								padding : 10
							},
							c : '첫 글이 작성된지 ' + INTEGER((new Date().getTime() - TIME(firstArticleData.createTime).getTime()) / 24 / 60 / 60 / 1000) + '일이 지났습니다.'
						}));
					}
				});
			});
			
			inner.on('close', function() {
				
				scrollStore.remove();
				authRoom.exit();
				connectionRoom.exit();
				tapEvent.remove();
				layout.remove();
				content = undefined;
				
				if (onNewArticleRoom !== undefined) {
					onNewArticleRoom.exit();
				}
			});
		}
	};
});
