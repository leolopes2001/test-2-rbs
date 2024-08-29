<h1>Configuração e Execução da API</h1>

<h2>Passos para Rodar a API</h2>

<ol>
<li><strong>Instalar Dependências:</strong></li>
<pre><code>composer install (PHP 8.2)</code></pre>

<li><strong>Parar Serviços do Sistema:</strong></li>
<pre><code>sudo service mysql stop</code></pre>
<pre><code>sudo service apache2 stop</code></pre>

<li><strong>Iniciar Contêineres Docker:</strong></li>
<pre><code>sail up -d --build</code></pre>

<li><strong>Gerar a Chave da Aplicação:</strong></li>
<pre><code>sail artisan key:generate</code></pre>

<li><strong>Executar Migrações:</strong></li>
<pre><code>sail artisan migrate</code></pre>
</ol>
