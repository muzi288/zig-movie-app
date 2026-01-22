using System.Net.Http;

namespace serverside.HttpClients;

public static class TmdbHttpClient
{
    private static HttpClient? _instance;

    public static HttpClient Instance
    {
        get
        {
            if (_instance == null)
            {
                _instance = new HttpClient
                {
                    BaseAddress = new Uri("https://api.themoviedb.org/3/")
                };
            }
            return _instance;
        }
    }
}
