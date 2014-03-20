define(['chai', 'smtpclient'], function(chai, SmtpClient) {
    'use strict';

    var expect = chai.expect;
    chai.Assertion.includeStack = true;

    describe('smtpclient integration tests', function() {
        var smtp;

        beforeEach(function(done) {
            // smtp = new SmtpClient('127.0.0.1', 10000);
            smtp = new SmtpClient('127.0.0.1', 10000, {
                useSSL: true,
                ca: '-----BEGIN CERTIFICATE-----\r\nMIICKTCCAZICCQDpQ20Tsi+iMDANBgkqhkiG9w0BAQUFADBZMQswCQYDVQQGEwJB\r\nVTETMBEGA1UECBMKU29tZS1TdGF0ZTEhMB8GA1UEChMYSW50ZXJuZXQgV2lkZ2l0\r\ncyBQdHkgTHRkMRIwEAYDVQQDEwlsb2NhbGhvc3QwHhcNMTQwMzE3MTM1MzMxWhcN\r\nMTQwNDE2MTM1MzMxWjBZMQswCQYDVQQGEwJBVTETMBEGA1UECBMKU29tZS1TdGF0\r\nZTEhMB8GA1UEChMYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMRIwEAYDVQQDEwls\r\nb2NhbGhvc3QwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAMD2N+TDbLNTJ9zX\r\nm8QLMYxlPbB8zg7mXKhsUf9nesY16vE8jCYPLGU4KrlwTz8rwU25o2b02RsQJJf1\r\nZHvLJRMbyRftwboeHDUgKwTlEpZr/u4gkhq7nXtDk3oDbMEzhgsIB7BBmF2/h9g0\r\nLPe+xO7IbOcPmkBHtsh8IdHqVuUFAgMBAAEwDQYJKoZIhvcNAQEFBQADgYEAbs6+\r\nswTx03uGJfihujLC7sUiTmv9rFOTiqgElhK0R3Pft4nbWL1Jhn4twUwCa+csCDEA\r\nroItaeKZAC5zUGA4uXn1R0dZdOdLOff7998zSY3V5/cMAUYFztqSJjvqllDXxAmF\r\n30HHOMhiXQI1Wm0pqKlgzGCBt0fObgSaob9Zqbs=\r\n-----END CERTIFICATE-----\r\n'
            });
            expect(smtp).to.exist;

            smtp.connect();
            smtp.onidle = function() {
                done();
            };
        });

        afterEach(function(done) {
            smtp.onclose = done;
            smtp.quit();
        });

        it('should succeed', function(done) {
            smtp.onidle = function() {
                done();
            };

            smtp.onready = function(failedRecipients) {
                expect(failedRecipients).to.be.empty;

                smtp.send('Subject: test\r\n\r\nMessage body');
                smtp.end();
            };

            smtp.ondone = function(success) {
                expect(success).to.be.true;
            };

            smtp.useEnvelope({
                from: 'sender@localhost',
                to: ['receiver@localhost']
            });
        });
    });
});