import { Router } from "express";
import ShowApiAllCurrenciesUseCase from "../../domain/use-cases/show-api-all-currencies.use-case";
import CurrencyController from "../controllers/currency.controller";
import { Connection } from "mongoose";
import CurrencyRepositoryImpl from "../data/repositories/currency.repository.impl";
import UpdateCurrencyUseCase from "../../domain/use-cases/update-currency.use-case";
import RegisterNewCurrencyCase from "../../domain/use-cases/register-new-currency.use-case";
import ShowAllCurrenciesUseCase from "../../domain/use-cases/show-all-currencies.use-case";
import ShowCurrencyUseCase from "../../domain/use-cases/show-currency.use-case";
import ShowApiCurrencyUseCase from "../../domain/use-cases/show-api-currency.use-case";
import ConvertCurrencyUseCase from "../../domain/use-cases/convert-currency.use-case";
import DeleteCurrencyUseCase from "../../domain/use-cases/delete-currency.use-case";

const currencyRoutes = (router: Router, connection: Connection) => {
    const CURRENCY_API_PREFIX = "/currencies";

    const currencyRepository = new CurrencyRepositoryImpl(connection);
    const registerNewCurrency = new RegisterNewCurrencyCase(
        currencyRepository
    );
    const updateCurrencyUseCase = new UpdateCurrencyUseCase(currencyRepository);
    const showCurrencyUseCase = new ShowCurrencyUseCase(currencyRepository);
    const showApiCurrencyUseCase = new ShowApiCurrencyUseCase(
        currencyRepository
    );
    const showAllCurrenciesUseCase = new ShowAllCurrenciesUseCase(
        currencyRepository
    );
    const showApiAllCurrenciesUseCase = new ShowApiAllCurrenciesUseCase(
        currencyRepository
    );
    const convertCurrencyUseCase = new ConvertCurrencyUseCase(
        currencyRepository
    );
    const deleteCurrencyUseCase = new DeleteCurrencyUseCase(currencyRepository);
    const currencyController = new CurrencyController(
        registerNewCurrency,
        updateCurrencyUseCase,
        showCurrencyUseCase,
        showApiCurrencyUseCase,
        showAllCurrenciesUseCase,
        showApiAllCurrenciesUseCase,
        convertCurrencyUseCase,
        deleteCurrencyUseCase
    );

    router.post(`${CURRENCY_API_PREFIX}/currency`, (request, response) =>
        currencyController.postCurrency(request, response)
    );

    router.patch(`${CURRENCY_API_PREFIX}/currency`, (request, response) =>
        currencyController.updateCurrency(request, response)
    );

    router.get(`${CURRENCY_API_PREFIX}/currency`, (request, response) =>
        currencyController.getOneCurrency(request, response)
    );

    router.get(`${CURRENCY_API_PREFIX}/all`, (request, response) =>
        currencyController.getAllCurrency(request, response)
    );

    router.get(
        `${CURRENCY_API_PREFIX}/api/currency/:code`,
        (request, response) =>
            currencyController.getApiCurrency(request, response)
    );

    router.get(`${CURRENCY_API_PREFIX}/api`, (request, response) =>
        currencyController.getAllApiCurrency(request, response)
    );

    router.get(`${CURRENCY_API_PREFIX}/convert`, (request, response) =>
        currencyController.convert(request, response)
    );

    router.delete(`${CURRENCY_API_PREFIX}/:code`, (request, response) =>
        currencyController.deleteCurrency(request, response)
    );
};

export default currencyRoutes;
