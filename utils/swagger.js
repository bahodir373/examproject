const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
      description: 'Blog platformasi uchun API hujjati',
    },
    servers: [
      {
        url: 'https://api.husainov.uz/api',
      },
    ],
		tags: [
      { name: 'Admin', description: 'Admin panel endpointlari' },
      { name: 'Author', description: 'Mualliflar bilan ishlash' },
      { name: 'Posts', description: 'Postlar bilan ishlash' },
      { name: 'Tags', description: 'Taglar bilan ishlash' },
      { name: 'Encyclopedia', description: 'Yuridik ensiklopediya bo‘limi' },
      { name: 'Contacts', description: 'Aloqa uchun murojaatlar' }
    ],
		components: {
			securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
				Admin: {
					type: 'object',
					properties: {
						_id: {
							type: 'string',
							description: 'Admin ID',
							example: '65d6211b9f7f9a001b5e17a3'
						},
						username: {
							type: 'string',
							description: 'Admin username',
							example: 'admin'
						},
						password: {
							type: 'string',
							description: 'Admin paroli (hashed ko‘rinishda saqlanadi)',
							example: '$2b$10$VxJnLqR...'
						},
						token: {
							type: 'string',
							description: 'JWT token',
							example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
						}
					}
				},
        Author: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Author ID'
            },
            fullName: {
              type: 'string',
              description: 'Full name of the author'
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'Birth date of the author'
            },
            birthPlace: {
              type: 'string',
              description: 'Birth place of the author'
            },
            education: {
              type: 'string',
              description: 'Education of the author'
            },
            achievements: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'List of achievements'
            },
            website: {
              type: 'string',
              description: 'Author\'s website'
            },
            image: {
              type: 'string',
              description: 'Image filename'
            }
          }
        },
				Post: {
					type: "object",
					properties: {
						_id: {
							type: "string",
							description: "Post ID",
							example: "65d64b899f7f9a001b5e17b4"
						},
						title: {
							type: "string",
							description: "Post sarlavhasi",
							example: "Yangi qonunlar tahlili"
						},
						slug: {
							type: "string",
							description: "URL uchun yaratilgan slug",
							example: "yangi-qonunlar-tahlili"
						},
						date: {
							type: "string",
							format: "date-time",
							description: "Post yaratilgan sana",
							example: "2024-02-20T12:34:56Z"
						},
						views: {
							type: "integer",
							description: "Post ko'rilganlar soni",
							example: 120
						},
						category: {
							type: "string",
							description: "Post kategoriyasi",
							example: "sud-huquq"
						},
						image: {
							type: "string",
							description: "Post rasmi",
							example: "uploads/image.jpg"
						},
						content: {
							type: "string",
							description: "Post kontenti",
							example: "Bu yerda postning asosiy matni joylashadi."
						},
						tags: {
							type: "array",
							items: {
								type: "number"
							},
							description: "Postga tegishli taglar"
						},
						highlighted: {
							type: "boolean",
							description: "Post asosiy bo'limda ko'rinishi uchun",
							example: false
						}
					}
				},
				Contact: {
					type: "object",
					properties: {
						_id: {
							type: "string",
							description: "Kontakt ID",
							example: "65d64b899f7f9a001b5e17b4"
						},
						name: {
							type: "string",
							description: "Murojaat qiluvchi ismi",
							example: "Ali Valiyev"
						},
						phone: {
							type: "string",
							description: "Telefon raqami",
							example: "+998901234567"
						},
						email: {
							type: "string",
							description: "Email manzili",
							example: "ali.valiyev@example.com"
						},
						subject: {
							type: "string",
							enum: ["Taklif", "Tanqid", "Shikoyat"],
							description: "Murojaat turi",
							example: "Taklif"
						},
						message: {
							type: "string",
							description: "Murojaat matni",
							example: "Saytni yanada yaxshilash uchun taklifim bor."
						},
						createdAt: {
							type: "string",
							format: "date-time",
							description: "Murojaat yuborilgan sana",
							example: "2024-02-22T14:45:00.000Z"
						}
					}
				},
				Tag: {
          type: 'object',
          required: ['id', 'name'],
          properties: {
            name: {
              type: 'string',
              description: 'Tag nomi',
              example: 'Texnologiya',
            },
          },
        },
				Term: {
					type: "object",
					properties: {
						term: {
							type: "string",
							description: "Atama nomi",
							example: "Konstitutsiya"
						},
						description: {
							type: "string",
							description: "Atama izohi",
							example: "Konstitutsiya — davlatning asosiy qonuni."
						}
					}
				}
      }
    }
  },
  apis: ['./routers/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
