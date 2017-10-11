const sql = require(__dirname + '/sql');

const pageSize = 20;

const columnMapper = {
	
	c2dMappings : {
		'id' : 'Provider ID', 
		'name' : 'Provider Name',
		'street' : 'Provider Street Address',
		'city' : 'Provider City',
		'state' : 'Provider State',
		'zip_code' : 'Provider Zip Code',
		'ref_region' : 'Hospital Referral Region Description',
		'total_discharges' : 'Total Discharges',
		'average_covered_charges' : 'Average Covered Charges',
		'average_total_payments' : 'Average Total Payments',
		'average_medicare_payments' : 'Average Medicare Payments',
	},
	
	d2cMappings : {},
	
	init: () => {
		Object.keys(columnMapper.c2dMappings).forEach(key => {
			columnMapper.d2cMappings[columnMapper.c2dMappings[key]] = key;		
		});
	},
	
	mapColumnToDisplay: (column) => {
		return columnMapper.c2dMappings[column];
	},
	
	mapDisplayToColumn: (display) => {
		return columnMapper.d2cMappings[display];
	}
	
}
columnMapper.init();

function getQueryClause(param, value){
	if(!value) return;
	
	var operator = param.startsWith('min') ? '>=' : param.startsWith('max') ? '<=' : '=';
	value = sql.escape(value);
	var suffix = operator + value;
	
	switch(param){
		case 'max_discharges':
			return 'total_discharges' + suffix;
		case 'min_discharges':
			return 'total_discharges' + suffix;
		case 'max_average_covered_charges':
			return 'average_covered_charges' + suffix;
		case 'min_average_covered_charges':
			return 'average_covered_charges' + suffix;
		case 'max_average_medicare_payments':
			return 'average_medicare_payments' + suffix;
		case 'min_average_medicare_payments':
			return 'average_medicare_payments' + suffix;
		case 'state':
			return 'state' + suffix;
	}
	return;
}

module.exports = {
	
	parse : function(requestObject){
		var selectedColumns = [];
		Object.keys(requestObject).forEach(key =>{
			var column = columnMapper.mapDisplayToColumn(key);
			if(column) selectedColumns.push(column);
		});
		var selectPart = selectedColumns.length > 0 ? selectedColumns.join(',') : "*";
		
		var whereClauses = [];
		Object.keys(requestObject).forEach(key =>{
			var clause = getQueryClause(key, requestObject[key]);
			if(clause) whereClauses.push(clause);
		});
		var wherePart = whereClauses.length > 0 ? " where " + whereClauses.join(' and ') : "";
	
		var limit = ((parseInt(requestObject.pageNum) || 0)*pageSize) + "," + pageSize;
		
		return "select " + selectPart + " from provider" + wherePart + " order by id asc limit " + limit;
	},
	
	execute : function(queryString, callback){
		sql.query(queryString, (err, rows) => {
			if(err) callback(err);
			else callback(err, rows.map(row => {
				var mappedRow = {};
				Object.keys(row).forEach(key => {
					mappedRow[columnMapper.mapColumnToDisplay(key)] = row[key];
				})
				return mappedRow;
			}));
		});
	},
	
	getFields: function(){
		return Object.keys(columnMapper.d2cMappings);	
	}
	
}
