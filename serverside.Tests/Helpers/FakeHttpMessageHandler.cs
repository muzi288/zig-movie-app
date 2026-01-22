using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace serverside.Tests.Helpers;

public class FakeHttpMessageHandler : HttpMessageHandler
{
    private readonly string _response;

    public FakeHttpMessageHandler(string response)
    {
        _response = response;
    }

    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        return Task.FromResult(new HttpResponseMessage
        {
            StatusCode = HttpStatusCode.OK,
            Content = new StringContent(
                _response,
                Encoding.UTF8,
                "application/json"
            )
        });
    }
}