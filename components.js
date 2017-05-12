var menu = { container:"menu",view:"menu", data:["Google", "Facebook", "Twitter"] } ;		
		
var flag = 0;


		
var grid = {
			view:"datatable",	id:"mytable",
			columns:[
				{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}],  width:40,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Sabor",{content:"textFilter"}],    sort:"string",	width:200},
				{ id:"ent1",	editor:"text",  header:["Peso mínimo",{content:"numberFilter"}],sort:"int",width:200},
			
			],
			autoheight:true,
			autowidth:true,
			autoConfig:true,
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->api.php/tbl1s",
			url: "rest->api.php/tbl1s",
			on:{
					onStructureLoad:function(){
					console.log("llega aca");	
						f1();
			}},
		};
		var buttons = {
			view:"toolbar", elements:[
				{ view:"button", value:"Agregar ", 
				click:function(){
					$$('mytable').add({
						id:'#',
						str1:"Modifique aquí su sabor",
						ent1:5000,
					});					
					$$('mytable').clearAll();
					webix.ajax("api.php/tbl1s?transform=1", function(text, data, XmlHttpRequest){
					data = data.json();  data = data.tbl1s;
					$$("mytable").parse(data, "json");});
					
				}},
				{ view:"button", value:"Eliminar", click:function(){
					var id = $$('mytable').getSelectedId();
					if (id)
						$$('mytable').remove(id);
						
				}}
				,
				{ view:"button", value:"Cargar tabla", click:function(){
					$$('mytable').clearAll();
					webix.ajax("api.php/tbl1s?transform=1", function(text, data, XmlHttpRequest){
					data = data.json();  data = data.tbl1s;
					$$("mytable").parse(data, "json");
					}); 	
				}}
				
			]
		};

		var grid2 = {
			view:"datatable",	id:"mytable1",
			columns:[
				{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}], css:"ent1",  width:50,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Ubicación",{content:"textFilter"}], css:"ent1",  width:200,sort:"string"}
			
			],
			autoheight:true,
			autowidth:true,
			autoConfig:true,
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->api.php/tbl2s",
			url: "rest->api.php/tbl2s",
			on:{
					onStructureLoad:function(){
					console.log("llega aca");	
						f2();
			}},
		};
		var buttons2 = {
			view:"toolbar", elements:[
				{ view:"button", value:"Agregar ", click:function(){
				
					$$('mytable1').add({
						id:"#",
						str1:"ubicaciónX",
						
						
					});
					f2();
				}},
				{ view:"button", value:"Eliminar", click:function(){
					var id = $$('mytable1').getSelectedId();
					if (id)
						$$('mytable1').remove(id);
				
				    f2();
				}}
				
			]
		};
		
				var buttons2_8 = {
			view:"toolbar", elements:[
				
				{ view:"button", value:"Seleccionar Destino", 
					click:function(){
						var id = $$('mytable1').getSelectedId();
						$$('fr1_str1').setValue(id);
						 var vv = moment().format('YYYYMMDDhhmmssa'); 
					var t = "Translado-";
	var tbl8_str1 = t.concat(vv);
   $$('fr1_str2').setValue(tbl8_str1);
						$$('mytable1').hide();
					flag = 1;
					}
				},
				{ view:"button", value:"Buscar Destinos", 
					click:function(){
						if (flag === 0 ){$$('mytable1').hide();}else{$$('mytable1').show();}
						if (flag === 0 ){flag = 1; } else{flag = 0; }   
					}
				}
			]
		};
		
	var grid8 = {
			view:"datatable",	id:"mytable8",
			columns:[
				{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}], css:"ent1",  width:50,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Código",{content:"textFilter"}], css:"ent1",  width:220,sort:"string"},
				{ id:"ent1",	editor:"text",  header:["Ubicación Origen",{content:"textFilter"}], css:"ent1",  width:200,sort:"string"},
				{ id:"ent2",	editor:"text",  header:["Ubicación Destino",{content:"textFilter"}], css:"ent2",  width:200,sort:"string"},
				{ id:"ent3",	editor:"text",  header:["Caja",{content:"textFilter"}], css:"ent3",  width:200,sort:"string"},
			{ id:"tbl3peso",	editor:"text",  header:["Peso",{content:"textFilter"}],
template:function(obj){
var URL = "api.php/tbl3s/";var dat;
if (! (obj.ent3 == null)){
 URL = URL.concat(obj.ent3);
 console.log("URL===");console.log(URL);
 $.ajaxSetup({async:false});$.get(URL, function(data, status){
     if (data === null) { dat = "ID no encontrado";}   
	 if (data !== null) { dat = data.ent1 ;}   		
		console.log("en el GET");
		console.log(dat);
		});
		}
console.log("Despues del GET");console.log(dat);			
return "<span style='color:green;'>"+dat+"</span>";},width:200,sort:"string"},
{ id:"tbl1str1",	editor:"text",  header:["Sabor",{content:"textFilter"}],
template:function(obj){
var URL = "api.php/tbl3s/"; var URL1 = "api.php/tbl1s/"; 
var dat;
 if (!(obj == null)  && !(obj.ent3  === undefined) ){
 URL = URL.concat(obj.ent3);
 $.ajaxSetup({async:false});
 $.get(URL, function(data, status){
       if (data !== null){URL1 = URL1.concat(data.tbl1Id);
	   $.ajaxSetup({async:false});
	   $.get(URL1, function(data1, status){
       dat = data1.str1;
		});
		}
		});
		}	
console.log("Despues del GET");console.log(dat);			
return "<span style='color:green;'>"+dat+"</span>";},width:200,sort:"string"},
			],			
			autoheight:true,
			autowidth:true,
			autoConfig:true,
			select:"row", editable:true, editaction:"dblclick",
			pager:{
					container:"paging_hereb",
					size:10,
					
				},
			save: "rest->api.php/tbl8s",
			url: "rest->api.php/tbl8s",
			on:{
					"onDataUpdate":function(){						
						console.log("onDataUpdate is being activated");					
					location.reload(); 
					f8();
					}
			
	}};
		var buttons8 = {
			view:"toolbar", elements:[
				{ view:"button", 
				hidden:true,
				value:"Agregar ", click:function(){
				
					$$('mytable8').add({
						id:"#",
						str1:"ubicaciónX",
						ent1:1,
						ent2:1,
						ent3:1,
						
					});
				$$("mytable8").clearAll();
					$$("mytable8").load('tbl8');
					location.reload(); 
				f8();
				}},
				{ view:"button", value:"Eliminar", click:function(){
					var id = $$('mytable8').getSelectedId();
					if (id)
						$$('mytable8').remove(id);
				
				
				}},
				{ view:"button", value:"Listar todos los Traslados", click:function(){
					f8();
				}}
				
			]
		};		
		
	var resp;	
		var grid3 = {
			view:"datatable",	id:"mytable3",
			columns:[
			{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}], css:"ent1",  width:50,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Codigo Interno",{content:"textFilter"}], css:"ent1",  width:150,sort:"string"},
				{ id:"ent1",	editor:"text",  header:["Peso",{content:"textFilter"}],	width:70,sort:"string"},
				{ id:"ent2",	editor:"text",  header:["Peso",{content:"textFilter"}],	width:70,sort:"string",hidden:true},
				{ id:"tbl1Id",	editor:"text",  header:["ID Sabor",{content:"numberFilter"}],	width:200,sort:"string"},
				{ id:"str2",	editor:"text",  header:["Fecha de baja",{content:"textFilter"}], css:"str2",  width:180,sort:"string"},
				{ id:"tbl1Txt",	editor:"text",  header:["Sabor",{content:"textFilter"}],
template:function(obj){
var tbl1Txt = "api.php/tbl1s/";var dat;
 if (!(obj.tbl1Id == null)){
 tbl1Txt = tbl1Txt.concat(obj.tbl1Id);
 $.ajaxSetup({async:false});
  $.get(tbl1Txt, function(data, status){
        if (data === null) { dat = "ID Sabor desconocido";} 		
		if (!( data === null)){dat = data.str1;}			
        });
	}	
		
return "<span style='color:green;'>"+dat+"</span>";											
						},
				width:200,sort:"string"},
				{ id:"tbl2Id",	editor:"text",  header:["Ubicación",{content:"textFilter"}],	width:200,sort:"string"},
			{ id:"ent3",	editor:"text",  header:["1-Acitvo;0-Inactivo",{content:"textFilter"}],	width:200,sort:"string"},
			],
			autoConfig:true,
			autoheight:true,
			autowidth:true,
			pager:{
					container:"paging_here",
					size:10
				},
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->api.php/tbl3s",
			url: "rest->api.php/tbl3s",
			on:{
					onStructureLoad:function(){
					console.log("llega aca");	
						f3();
			}},
		};
		
		var form3 = {
				id: "form3",
				view:"form",
				elements:[
					{ view:"text",id:"f3s1", name:"str1", label:"Código Interno"},
					{ view:"text", name:"ent1", label:"Peso"},
					{ view:"text", name:"tbl1Id", label:"ID Sabor"},
                    { view:"text", name:"tbl2Id", label:"ID ubicacion"},
					{ view:"button", label:"Crear Caja" , type:"form", click:"save_form" },
					{ view:"button", label:"Reset", click:"$$('form1').clear();" }
					],
					on:{
					onBeforeLoad:function(){
						console.log("pasa por aca");
						$$('f3s1').setValue("aaaaaaaaaaaa");
					},
					onAfterLoad:function(){
						this.hideOverlay();
					}
				},
				rules:{
					title: webix.rules.isNotEmpty,
					year: webix.rules.isNumber,
					votes: webix.rules.isNotEmpty,
                    rank: webix.rules.isNumber
				}

			};
		
		
			
		var buttons3 = {
			view:"toolbar", elements:[
				{ view:"button", value:"Agregar ", click:function(){
				var vv = moment().format('YYYYMMDDhhmmssa');
				var v1 = moment().format('DD/MM/YYYY hh:mm:ss a');	
					$$('mytable3').add({
						str1:  vv ,
						ent1:"5000",
						str2:'',
						ent2:0,
						tbl1Id:'1',
						tbl2Id:'4',
						ent3:'1'
						
					});				
					f3();
				}
				},
				{ view:"button", value:"Eliminar", click:function(){
					var id = $$('mytable3').getSelectedId();
					if (id)
						$$('mytable3').remove(id);
					f3();
				}},
				{ view:"button", value:"Dar de baja/Restaurar", click:function(){
					console.log("llega acá");
					var id = $$('mytable3').getSelectedId();
					var item = $$('mytable3').getSelectedItem();
					var url_put = 'api.php/tbl3s/';
					url_put = url_put.concat(id);						
					item.ent3 = ( item.ent3 + 1 ) % 2 ; 
				var tbl3_str2 = moment().format('DD-MM-YYYY hh:mm:ssa');				
				if (item.ent3 == 1){					
				tbl3_str2 = '';
				}					
				$.ajax({
					url: url_put,
					method: 'PUT',
					data : {'ent3': item.ent3,
					'str2':  tbl3_str2 },
					success: function(response) {
		
						}
				});
				location.reload();
				}}			
			]
		};
		
		var buttons3_8 = {
			view:"toolbar", elements:[
				{ view:"button", value:"Seleccionar Caja", click:function(){
					var id = $$('mytable3').getSelectedId();
					var item = $$('mytable3').getSelectedItem();
					console.log("Selected id...");console.log(item.id);
					var vv = moment().format('YYYYMMDDhhmmssa'); 
					var t = "Translado-";
					var res = t.concat(vv);
					
					$$('mytable8').add({
						str1:  res ,
						ent1:item.tbl2Id,
						ent2:item.tbl2Id,
						ent3:item.id,	
					});
					console.log("Tratando de cargar");
					
				}}			
			]
		};
		
		var buttons3_8m = {
			view:"toolbar", elements:[
				{ view:"button", value:"Seleccionar Caja", click:function(){
					var id = $$('mytable3').getSelectedId();
					var item = $$('mytable3').getSelectedItem();
					console.log("Selected id...");console.log(item.id);					
					$$('mytable8').add({
						str1:$$('fr1_str2').getValue(),
						ent1:item.tbl2Id,
						ent2:$$('fr1_str1').getValue(),
						ent3:item.id,	
					});
					console.log("Tratando de cargar");
					
				}}			
			]
		};	
		
		var grid4 = {
			view:"datatable",	id:"mytable4",
			columns:[
				{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}],  width:40,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Nombre/Razón Social",{content:"textFilter"}],    sort:"string",	width:200},
				{ id:"str2",	editor:"text",  header:["RUC/CI",{content:"numberFilter"}],sort:"int",width:200},
			
			],
			on:{
					onSelectChange:function(){
					var id = $$('mytable4').getSelectedId();
					var item = $$('mytable4').getSelectedItem();
					if (id){
						if($$('txt1')){$$('txt1').setValue(id);}
						if(item.str1) { if($$('txt2')){$$('txt2').setValue(item.str1);$$('mytable4').hide();}}					
						}
						
					}
				},
				autoConfig:true,
			autoheight:true,
			autowidth:true,
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->tbl4",
			url: "rest->tbl4"
		};
		
		
			var grid7 = {
			view:"datatable",	id:"mytable7",
			columns:[
				{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}],  width:40,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Producto",{content:"textFilter"}],    sort:"string",	width:200},
				{ id:"str2",	editor:"text",  header:["RUC/CI",{content:"numberFilter"}],sort:"int",width:200},
			
			],
			on:{
					onSelectChange:function(){
					var id = $$('mytable7').getSelectedId();
					var item = $$('mytable7').getSelectedItem();
					if (id){
						if($$('txt1')){$$('txt1').setValue(id);}
						if(item.str1) { if($$('txt2')){$$('txt2').setValue(item.str1);$$('mytable7').hide();}}					
						}
						
					}
				},
			autoheight:true,
			autowidth:true,
			autoConfig:true,
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->tbl7",
			url: "rest->tbl7"
		};
		
		
		var buttons4 = {
			view:"toolbar", elements:[
				{ view:"button", value:"Agregar ", 
				click:function(){
					$$('mytable4').add({
						id:'#',
						str1:"ClienteX",
						str2:"XXXXXXXXX-X",
					});					
					$$("mytable4").clearAll();
					$$("mytable4").load('tbl4');
					console.log("agregando....");
				}},
				{ view:"button", value:"Eliminar", click:function(){
					var id = $$('mytable4').getSelectedId();
					if (id)
						$$('mytable4').remove(id);						
				}}			
			]
		};	
		
		var buttons4_2 = {
			view:"toolbar", elements:[				
				{ view:"button", value:"Seleccionar", click:function(){
					var id = $$('mytable4').getSelectedId();
					var item = $$('mytable4').getSelectedItem();
					if (id){
						$$('txt1').setValue(id);
						if(item.str1) { $$('txt2').setValue(item.str1); }					
				}
				$$('mytable4').hide();
				}},
				{ view:"button", value:"Buscar", click:function(){
					
					$$('mytable4').show();
				}}
			]
		};	
		
var txt1 = { view:"text", id:"txt1",value:'dummy@email.com', label:"Id Objeto" };
var txt2 =	{ view:"text", id:"txt2",value:'', label:"Objeto Seleccionado"};		
		

var grid5 = {
			view:"datatable",	id:"mytable5",
			columns:[
				{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}],  width:40,sort:"int"},
				{ id:"str1",	editor:"text",  header:["Codigo",{content:"textFilter"}],    sort:"string",	width:200},
				{ id:"str2",	editor:"text",  header:["Descripcion",{content:"numberFilter"}],sort:"int",width:200},
			{ id:"ent1",	editor:"text",  header:["Precio de Venta",{content:"numberFilter"}],	width:70,sort:"string"},
			],
			autoheight:true,
			autowidth:true,
			autoConfig:true,
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->tbl5",
			url: "rest->tbl5"
		};
		var buttons5 = {
			view:"toolbar", elements:[
				{ view:"button", value:"Agregar ", 
				click:function(){
					$$('mytable5').add({
						id:'#',
						str1:"Producto-X",
						str2:"Descripcion-X",
						ent1:15000,
					});					
					$$("mytable5").clearAll();
					$$("mytable5").load('tbl5');
					console.log("agregando....");
				}},
				{ view:"button", value:"Eliminar", click:function(){
					var id = $$('mytable5').getSelectedId();
					if (id)
						$$('mytable5').remove(id);						
				}}			
			]
		};

var buttons5_2 = {
			view:"toolbar", elements:[
				{ view:"button", value:"Seleccionar Producto", 
				click:function(){
					$$('mytable5').add({
						id:'#',
						str1:"Producto-X",
						str2:"Descripcion-X",
						ent1:15000,
					});					
					$$("mytable5").clearAll();
					$$("mytable5").load('tbl5');
					console.log("agregando....");
				}}
							
			]
		};		
		
		var grida = {
			view:"datatable",	id:"mytablea",
			columns:[
			{ id:"id",	editor:"text",  header:["Id",{content:"numberFilter"}],  width:50,sort:"string"},
				{ id:"str1",	editor:"text",  header:["Sabor",{content:"textFilter"}],	width:200,sort:"string"},
				{ id:"str2",	editor:"text",  header:["Ubicación",{content:"textFilter"}],	width:200,sort:"string"},
				{ id:"ent1",	editor:"text",  header:["Peso Mínimo",{content:"textFilter"}],	width:120,sort:"int"},
				{ id:"sum",	editor:"text",  header:["Total pesaje",{content:"textFilter"}],	width:150,sort:"int"},
				{ id:"dif",	editor:"text",  header:["Valor a producir",{content:"textFilter"}],	width:150,sort:"int"},
			],
			autoheight:true,
			autowidth:true,
			autoConfig:true,
			select:"row", editable:true, editaction:"dblclick",
			save: "rest->api.php/v1?transform=1",
			url: "rest->api.php/v1?transform=1",
			on:{
					onStructureLoad:function(){
					console.log("llega aca");	
						fv1();
			}},
		};
		
		var buttonsa = {
			view:"toolbar", elements:[
				{ view:"button", value:"Activos ", click:function(){
							
				$$("mytablea").clearAll();
				fv1();	
				}},
				{ view:"button", value:"De baja", click:function(){
					$$("mytablea").clearAll();
					fv2();	
				}}			
			]
		};
		
		var fr1 = {
    view:"form", id:"fr1", elements:[
        {view:"text", id:"fr1_str1",name:"str1",label:"ID Destino"},
        {view:"text", id:"fr1_str2",name:"str2",label:"CodTraslado"}
    ] , 
on:{
					onBeforeLoad:function(){
						console.log("Cargando codigo de Traslado");
						  var vv = moment().format('YYYYMMDDhhmmssa'); 
					var t = "Translado-";
	var tbl8_str1 = t.concat(vv);
   $$('fr1_str2').setValue(tbl8_str1);
					},
	
		} }   
		var dp = { view:"datepicker", 
			timepicker:true, 
			label:"Fecha", name:"dat1", 
			stringResult:true, 
			value:new Date(),
				format:"%d %M %Y at %H:%i" };
		
		
		
		
	function f1(){
		$$('mytable').clearAll();
					webix.ajax("api.php/tbl1s?order=id,desc", function(text, data, XmlHttpRequest){	
					data = php_crud_api_transform(data.json()); 	
					$$("mytable").parse(data.tbl1s, "json");
					});						
	} 	
		
		
			
	function f2(){
		$$('mytable1').clearAll();
					webix.ajax("api.php/tbl2s?order=id,desc", function(text, data, XmlHttpRequest){	
					data = php_crud_api_transform(data.json()); 	
					$$("mytable1").parse(data.tbl2s, "json");
					});
	} 
	
	function f3(){
		$$('mytable3').clearAll();
					webix.ajax("api.php/tbl3s?order=id,desc", function(text, data, XmlHttpRequest){	
					data = php_crud_api_transform(data.json()); 	
					$$("mytable3").parse(data.tbl3s, "json");
					});		
	} 
	
	
	
	function f8(){
		$$('mytable8').clearAll();
					webix.ajax("api.php/tbl8s?order=id,desc", function(text, data, XmlHttpRequest){	
					data = php_crud_api_transform(data.json()); 	
					$$("mytable8").parse(data.tbl8s, "json");
					});	
	} 
	
	
function fv1(){
		$$('mytablea').clearAll();
					webix.ajax("api.php/v1?transform=1", function(text, data, XmlHttpRequest){
					data = data.json();  data = data.v1;
					$$("mytablea").parse(data, "json");});		
	}

function fv2(){
		$$('mytablea').clearAll();
					webix.ajax("api.php/v2?transform=1", function(text, data, XmlHttpRequest){
					data = data.json();  data = data.v2;
					$$("mytablea").parse(data, "json");
					});		
	} 	
		
	var data = {id:1, fname:"Ann", lname:"Brown"};
	
	
	function php_crud_api_transform(tables) {
	var array_flip = function (trans) {
		var key, tmp_ar = {};
		for (key in trans) {
			tmp_ar[trans[key]] = key;
		}
		return tmp_ar;
	};
	var get_objects = function (tables,table_name,where_index,match_value) {
		var objects = [];
		for (var record in tables[table_name]['records']) {
			record = tables[table_name]['records'][record];
			if (!where_index || record[where_index]==match_value) {
				var object = {};
				for (var index in tables[table_name]['columns']) {
					var column = tables[table_name]['columns'][index];
					object[column] = record[index];
					for (var relation in tables) {
						var reltable = tables[relation];
						for (var key in reltable['relations']) {
							var target = reltable['relations'][key];
							if (target == table_name+'.'+column) {
								column_indices = array_flip(reltable['columns']);
								object[relation] = get_objects(tables,relation,column_indices[key],record[index]);
							}
						}
					}
				}
				objects.push(object);
			}
		}
		return objects;
	};
	tree = {};
	for (var name in tables) {
		var table = tables[name];
		if (!table['relations']) {
			tree[name] = get_objects(tables,name);
			if (table['results']) {
				tree['_results'] = table['results'];
			}
		}
	}
	return tree;
}


var sd = {view: "sidemenu",id: "menu",
			width: 200,position: "left",
			state:function(state){
				var toolbarHeight = $$("toolbar").$height;
				state.top = toolbarHeight;
				state.height -= toolbarHeight;
			},
			css: "my_menu",
			body:{
				view:"list",
				borderless:true,
				scroll: false,
				template: "<span class='webix_icon fa-#icon#'></span> #value#",
				data:[
				{id: 0, value: "Customers1", icon: "user"},
					{id: 1, value: "Customers", icon: "user"},
					{id: 2, value: "Products", icon: "cube"},
					{id: 3, value: "Reports", icon: "line-chart"},
					{id: 4, value: "Archives", icon: "database"},
					{id: 5, value: "Settings", icon: "cog"}
				],
				select:true,
				type:{
					height: 40
				}
			}
		};
		
		
var tlb = {
					view: "toolbar", id:"toolbar", elements:[
					{
						view: "icon", icon: "bars",
						click: function(){
							if( $$("menu").config.hidden){
								$$("menu").show();
							}
							else
								$$("menu").hide();
						}
					},
					{view: "label",label: "Gele System"}
				]
				};