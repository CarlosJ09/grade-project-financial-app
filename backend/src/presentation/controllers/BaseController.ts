import { Request, Response } from 'express';

/**
 * Base controller that provides common functionality for all controllers.
 */
export abstract class BaseController {
  /**
   * Sends a successful response with data
   */
  protected ok<T>(res: Response, data: T): Response {
    return res.status(200).json(data);
  }

  /**
   * Sends a created response (201) with data
   */
  protected created<T>(res: Response, data: T): Response {
    return res.status(201).json(data);
  }

  /**
   * Sends a no content response (204)
   */
  protected noContent(res: Response): Response {
    return res.status(204).send();
  }

  /**
   * Sends a not found response (404)
   */
  protected notFound(
    res: Response,
    message: string = 'Resource not found'
  ): Response {
    return res.status(404).json({ message });
  }

  /**
   * Sends a bad request response (400)
   */
  protected badRequest(
    res: Response,
    message: string = 'Bad request'
  ): Response {
    return res.status(400).json({ message });
  }

  /**
   * Sends an internal server error response (500)
   */
  protected internalServerError(
    res: Response,
    message: string = 'Internal server error'
  ): Response {
    return res.status(500).json({ message });
  }

  /**
   * Sends a conflict response (409)
   */
  protected conflict(res: Response, message: string = 'Conflict'): Response {
    return res.status(409).json({ message });
  }

  /**
   * Sends an unauthorized response (401)
   */
  protected unauthorized(
    res: Response,
    message: string = 'Unauthorized'
  ): Response {
    return res.status(401).json({ message });
  }

  /**
   * Sends a forbidden response (403)
   */
  protected forbidden(res: Response, message: string = 'Forbidden'): Response {
    return res.status(403).json({ message });
  }

  /**
   * Generic error handler that catches exceptions and sends appropriate response
   */
  protected async executeOperation(
    res: Response,
    operation: () => Promise<any>,
    errorMessage: string = 'An error occurred'
  ): Promise<Response | void> {
    try {
      return await operation();
    } catch (error) {
      console.error(error);
      return this.internalServerError(res, errorMessage);
    }
  }

  /**
   * Validates that required parameters exist in request
   */
  protected validateRequiredParams(
    req: Request,
    requiredParams: string[]
  ): string[] {
    const missingParams: string[] = [];

    for (const param of requiredParams) {
      if (!req.params[param] && !req.body[param] && !req.query[param]) {
        missingParams.push(param);
      }
    }

    return missingParams;
  }

  /**
   * Generic handler for getById operations
   */
  protected async handleGetById<T>(
    req: Request,
    res: Response,
    useCase: { execute(id: string): Promise<T | null> },
    dtoMapper: { fromEntity(entity: T): any },
    resourceName: string = 'Resource'
  ): Promise<Response | void> {
    return this.executeOperation(
      res,
      async () => {
        const { id } = req.params;

        if (!id) {
          return this.badRequest(res, 'ID parameter is required');
        }

        const entity = await useCase.execute(id);

        if (!entity) {
          return this.notFound(res, `${resourceName} not found`);
        }

        const dto = dtoMapper.fromEntity(entity);
        return this.ok(res, dto);
      },
      `Error retrieving ${resourceName.toLowerCase()}`
    );
  }

  /**
   * Generic handler for getAll operations
   */
  protected async handleGetAll<T>(
    req: Request,
    res: Response,
    useCase: { execute(): Promise<T[]> },
    dtoMapper: { fromEntity(entity: T): any }
  ): Promise<Response | void> {
    return this.executeOperation(
      res,
      async () => {
        const entities = await useCase.execute();
        const dtos = entities.map(dtoMapper.fromEntity);
        return this.ok(res, dtos);
      },
      'Error retrieving resources'
    );
  }

  /**
   * Generic handler for create operations
   */
  protected async handleCreate<TInput, TOutput>(
    req: Request,
    res: Response,
    useCase: { execute(data: TInput): Promise<TOutput> },
    dtoMapper: { fromEntity(entity: TOutput): any },
    resourceName: string = 'Resource'
  ): Promise<Response | void> {
    return this.executeOperation(
      res,
      async () => {
        const inputData = req.body as TInput;

        if (!inputData || Object.keys(inputData).length === 0) {
          return this.badRequest(res, 'Request body is required');
        }

        const entity = await useCase.execute(inputData);
        const dto = dtoMapper.fromEntity(entity);
        return this.created(res, dto);
      },
      `Error creating ${resourceName.toLowerCase()}`
    );
  }

  /**
   * Generic handler for update operations
   */
  protected async handleUpdate<TInput, TOutput>(
    req: Request,
    res: Response,
    useCase: { execute(id: string, data: TInput): Promise<TOutput | null> },
    dtoMapper: { fromEntity(entity: TOutput): any },
    resourceName: string = 'Resource'
  ): Promise<Response | void> {
    return this.executeOperation(
      res,
      async () => {
        const { id } = req.params;
        const inputData = req.body as TInput;

        if (!id) {
          return this.badRequest(res, 'ID parameter is required');
        }

        if (!inputData || Object.keys(inputData).length === 0) {
          return this.badRequest(res, 'Request body is required');
        }

        const entity = await useCase.execute(id, inputData);

        if (!entity) {
          return this.notFound(res, `${resourceName} not found`);
        }

        const dto = dtoMapper.fromEntity(entity);
        return this.ok(res, dto);
      },
      `Error updating ${resourceName.toLowerCase()}`
    );
  }

  /**
   * Generic handler for delete operations
   */
  protected async handleDelete(
    req: Request,
    res: Response,
    useCase: { execute(id: string): Promise<boolean> },
    resourceName: string = 'Resource'
  ): Promise<Response | void> {
    return this.executeOperation(
      res,
      async () => {
        const { id } = req.params;

        if (!id) {
          return this.badRequest(res, 'ID parameter is required');
        }

        const wasDeleted = await useCase.execute(id);

        if (!wasDeleted) {
          return this.notFound(res, `${resourceName} not found`);
        }

        return this.noContent(res);
      },
      `Error deleting ${resourceName.toLowerCase()}`
    );
  }

  /**
   * Generic handler for soft delete operations (when you return the deleted entity)
   */
  protected async handleSoftDelete<T>(
    req: Request,
    res: Response,
    useCase: { execute(id: string): Promise<T | null> },
    dtoMapper: { fromEntity(entity: T): any },
    resourceName: string = 'Resource'
  ): Promise<Response | void> {
    return this.executeOperation(
      res,
      async () => {
        const { id } = req.params;

        if (!id) {
          return this.badRequest(res, 'ID parameter is required');
        }

        const entity = await useCase.execute(id);

        if (!entity) {
          return this.notFound(res, `${resourceName} not found`);
        }

        const dto = dtoMapper.fromEntity(entity);
        return this.ok(res, dto);
      },
      `Error deleting ${resourceName.toLowerCase()}`
    );
  }
}
