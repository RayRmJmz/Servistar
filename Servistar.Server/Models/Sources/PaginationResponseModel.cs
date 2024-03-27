namespace Servistar.Server.Models.Sources
{
    public class PaginationResponseModel<T> where T : class
    {
        public IEnumerable<T> Results { get; set; }
        public int NextPage { get; set; }
        public bool HasMore { get; set; }
        public int Total { get; set; }
    }
}
