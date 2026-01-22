// serverside/Models/Movie.cs
#nullable enable
using System.ComponentModel.DataAnnotations;

namespace serverside.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; } // DB primary key

        public string Title { get; set; } = "";
        public string Overview { get; set; } = "";
        public string? Poster_Path { get; set; }
        public double Popularity { get; set; }
        public string? Homepage { get; set; } // Optional
    }
}

