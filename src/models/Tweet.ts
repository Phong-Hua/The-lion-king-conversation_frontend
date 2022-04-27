export default interface Tweet {
    id: string,
    text: string,
    authorId: string,
    timestamp: number,
    likes: string[],
    replies: string[],
    replyingTo: string | null
}