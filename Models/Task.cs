namespace JustDo.Models
{
    public class Task
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Description { get; set; }

        public User User { get; set; }
    }
}
