using serverside.Models;
using serverside.Repositories;

namespace serverside.Services;

public class MovieService
{
    private readonly MovieRepository _repository;

    public MovieService(MovieRepository repository)
    {
        _repository = repository;
    }

    public Task<List<MovieDto>> GetPopularAsync()
        => _repository.GetPopularAsync();

    public Task<List<MovieDto>> SearchAsync(string query)
        => _repository.SearchAsync(query);

    public Task<MovieDto?> GetByIdAsync(int id)
        => _repository.GetByIdAsync(id);
}
