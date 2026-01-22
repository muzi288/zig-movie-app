using serverside.Repositories;
using System.Net.Http;

namespace serverside.Tests.Repositories;

public class MovieRepositoryTestWrapper : MovieRepository
{
    public MovieRepositoryTestWrapper(HttpClient client)
        : base(client, "fake_key")
    {
    }
}