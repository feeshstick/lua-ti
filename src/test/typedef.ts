type Card = {
    /**
     * @description Checks if (Card card) can be used as material for a (Card linkCard). "player" is only an additional parameter, is used to send it to the functions as an additional parameter, such as target (function in SetTarget) or operation (function in SetOperation).
     * @param card
     * @param linkCard
     * @param player
     * @returns boolean
     */
    IsCanBeLinkMaterial(
        card: Card,
        linkCard?: Card,
        player?: number
    ): boolean
    RegisterEffect(
        effect: Effect
    ): void
}

type Effect = {
    CreateEffect(
        card: Card
    ): Effect
    SetCategory(
        card: Card,
        category: number
    ): void
    SetProperty(
        card: Card,
        property: number
    ): void
    SetType(
        card: Card,
        type: number
    ): void
    SetCode(
        card: Card,
        code: number
    ): void
}

type Self = {
    initial_effect(card: Card): void
}

type _ENV = {
    Card: Card,
    Effect: Effect,
    GetID(): [Self, number]
}
