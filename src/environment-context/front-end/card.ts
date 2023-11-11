export type Card = {
    /**
     * Return if (Card c) is in a Main Monster Zone. If (int tp) is provided, also returns if (Card c) is of that controller.
     * @param c
     * @param tp
     */
    IsInMainMZone: (c: Card, tp: number) => boolean
}