const queryHandler = require(__dirname + '/../queryHandler');

const pageSize = 20;

module.exports = {
	testWhereClause: function(test) {
		test.expect(2);
		
		// Empty case
		test.equal(queryHandler.parse({}), "select * from provider order by id asc limit 0," + pageSize);
		
		// Equal, less than, greater than case
		test.equal(queryHandler.parse({
			state: "ST",
			min_average_covered_charges: "21",
			max_average_covered_charges: "42"			
		}), "select * from provider where state='ST' and average_covered_charges>='21' and average_covered_charges<='42' order by id asc limit 0," + pageSize);
		
		test.done();
	},
	
	testSelectClause: function(test) {
		test.expect(2);
		
		// Empty case
		test.equal(queryHandler.parse({}), "select * from provider order by id asc limit 0," + pageSize);
		
		// Selective columns
		test.equal(queryHandler.parse({
			'Provider Name': true,
			'Provider Zip Code': true
		}), "select name,zip_code from provider order by id asc limit 0," + pageSize);
		
		test.done();
	},
	
	testPagination: function(test){
		test.expect(3);
	
		// Empty case
		test.equal(queryHandler.parse({}), "select * from provider order by id asc limit 0," + pageSize);
		
		// With page number
		test.equal(queryHandler.parse({
			pageNum: 4
		}), "select * from provider order by id asc limit " + (4*pageSize) + "," + pageSize);
		
		// Not numeric
		test.equal(queryHandler.parse({
			pageNum: 'a'
		}), "select * from provider order by id asc limit 0," + pageSize);
		
		test.done();
	},
	
	testGetFields: function(test){
		test.expect(1);
		test.ok(queryHandler.getFields().length > 0);
		test.done();
	}
};
