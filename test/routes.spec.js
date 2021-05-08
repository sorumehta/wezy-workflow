process.env.NODE_ENV = "test";

var chai = require("chai");
var should = chai.should();
var chaiHttp = require("chai-http");
var server = require("../app/index");

chai.use(chaiHttp);

describe("GET /api/v1/actions", function () {
    it("should return all actions", function (done) {
        chai.request(server)
            .get("/api/v1/actions")
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json; // jshint ignore:line
                res.body.should.have.property("data");
                res.body.data.should.be.a("array");
            });
    });
});
