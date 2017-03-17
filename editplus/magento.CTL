#TITLE=magento(learn)
#INFO
New Cliptext library
#SORT=n

#T=$_product->getShortDescription();
$_product->getShortDescription();
#T={{block type="cms/block" block_id="home_content1" template="cms/content.phtml"}}
{{block type="cms/block" block_id="home_content1" template="cms/content.phtml"}}
#T={{media url='wysiwyg/best_selling_img03.jpg'}}
{{media url='wysiwyg/best_selling_img03.jpg'}}
#T={{skin url='images/media/best_selling_img03.jpg'}}
{{skin url='images/media/best_selling_img03.jpg'}}
#T={{store direct_url="coalesce-functioning-on-impatience-t-shirt.html"}}
{{store direct_url="coalesce-functioning-on-impatience-t-shirt.html"}}
#T=<?=$this->getSkinUrl('images/btn_proceed_to_checkout.gif')?>
$this->getSkinUrl('images/btn_proceed_to_checkout.gif')
#T=<cms_no_route>no-route</cms_no_route>取消后台定义的CMS输出 在code里面
<cms_no_route>no-route</cms_no_route>
#T=修改系统地址
E:\xampp\htdocs\mall\app\code\core\Mage\Customer\Model\Address
#T=connect20.magentocommerce.com/community/Kontilint_News news
connect20.magentocommerce.com/community/Kontilint_News
#T=magento 安装jqueryzoom
http://www.magentocommerce.com/wiki/4_-_themes_and_template_customization/javascript_related/adding_jquery_support_using_a_jquery_plugin_example
#T=core/block/template/php 1.3版 toolbar 修改
public function isLastPage()
    {
        return $this->getCollection()->getCurPage() >= $this->getLastPageNum();
    } 

“app/code/core/Mage/Catalog/Block/Product/List/Toolbar.php”

class Mage_Catalog_Block_Product_List_Toolbar extends Mage_Core_Block_Template

chang to：

class Mage_Catalog_Block_Product_List_Toolbar extends Mage_Page_Block_Html_Pager 
#T=getChildHtml 调用模块
<?php echo $this->getChildHtml('^!') ?>
#T=getMediaUrl 
getMediaUrl 
#T=getRegisterUrl
<action method="addLink" translate="label title" module="customer"><label>Register</label><url helper="customer/getRegisterUrl"/><title>Register</title><prepare/><urlParams/><position>10</position></action>
#T=getUrl
$this->getUrl()
#T=magento  action增加class
<action method="addLink" translate="label title" module="customer"><label>My Account </label><url helper="customer/getAccountUrl"/><title>My Account</title><prepare/><urlParams/><position>101</position><class>myaccount </class></action>
#T=magento 显示2级分类
<?php $_helper = Mage::helper('catalog/category') ?>
<?php if (!Mage::registry('current_category')) return ?>
<?php $_categories = $this->getCurrentChildCategories() ?>
<?php $_count = is_array($_categories)?count($_categories):$_categories->count(); ?>
<?php if($_count): ?>
<div class="block block-layered-nav">
    <div class="block-title">
        <strong><span><?php echo $this->__('Browse By') ?></span></strong>
    </div>
    <div class="block-content">
        <dl id="narrow-by-list2">
            <dt><?php echo $this->__('Category') ?></dt>
            <dd>
                <ol>
                <?php foreach ($_categories as $_category): ?>
                    <?php if($_category->getIsActive()): ?>
                    <li>
                        <a href="<?php echo $this->getCategoryUrl($_category) ?>"<?php if ($this->isCategoryActive($_category)): ?> class="current"<?php endif; ?>><?php echo $this->htmlEscape($_category->getName()) ?></a> (<?php echo $_category->getProductCount() ?>)
						<?php $_subcategories12 = $_category->getChildrenCategories(); ?>

						<?php if (count($_subcategories12) > 0): ?>
							<?php foreach($_subcategories12 as $_subcategory_sb12): ?>
								<a href="<?php echo $_helper->getCategoryUrl($_subcategory_sb12) ?>">
									<?php echo $_subcategory_sb12->getName() ?>
								</a>
							<?php endforeach; ?>
						<?php endif; ?>

                    </li>
                    <?php endif; ?>
                <?php endforeach ?>
                </ol>
            </dd>
        </dl>
        <script type="text/javascript">decorateDataList('narrow-by-list2')</script>
    </div>
</div>
<?php endif; ?>
#T=magento的 Featured Products
http://www.magentocommerce.com/magento-connect/Inchoo/extension/2513/featured-products

更新后必须重新登录一次，直接点congif 设置才能启动
key： http://connect20.magentocommerce.com/community/Inchoo_FeaturedProducts
#T=magento显示错误信息
打开/errors/目录
把 local.xml.sample 改名为 local.xml
这时候刷新就能显示详细的错误信息了 
#T=magento移植步骤
移植步骤： 
1.用SVN将整个magento download下来。
2.修改\app\etc\local.xml里面的数据库链接设置
3.打开数据库表core_config_data ：将原来的默认路径“http://test.kimos.com/”改为新的地址。

#T=过滤掉其中的category标签
$_filter->getType() != "catalog/layer_filter_category"
#T=获取当前路径
<?php
$urlRequest = Mage::app()->getFrontController()->getRequest();
$urlPart = $urlRequest->getServer('ORIG_PATH_INFO');
if(is_null($urlPart)) {
$urlPart = $urlRequest->getServer('PATH_INFO');
}
$urlPart = substr($urlPart, 1 );
$currentUrl = $this->getUrl($urlPart);
echo $currentUrl;
?>
#T=加载后台xml的静态模块 cms/block
<block type="cms/block" name="banner" >
			<action method="setBlockId"><id>banner</id></action>
		</block>
#T=加载另一个分页phtml
<?php echo $this->getToolbarBlock()->setTemplate('catalog/product/list/toolbar1.phtml')->toHtml(); ?> 
#T=巧用magento的分类实现把特定产品放到首页
magento的首页是通过cms实现的静态页，我想如果我们去修改magento的routers应该是可以不让magento默认进入cms页面，而直接进入产品页面。不过目前我还没去试。我们也可以直接在cms页面中直接添加block实现在cms页面显示产品的目的：

首先，登陆后台，进入到cms --- manage page

然后，编辑当前启用的home page页

{{block type = "catalog/product_list" category_id="xx" template = "catalog/product/homepage.phtml" }}
这样是可以将某一类产品放到首页上去，然而经常碰到用户说他想要挑几个特定的产品放到首页上去。一直也没去想，因为以前就知道这样做肯定是可以的，而且总是从编程的角度去思考，总是想我只需要在magento的product/list block中加一点过滤条件就可以，而且确实是可以的，实现步骤如下：

1,在用户添加产品之前，为用户所使用的attributte set添加一个属性（如，show_on_homepage，名称可自定），这个属性类型设置为yesno类型，当值为yes时在首页显示，即如果用户想在首页显示这个产品就把这个设置成yes.

2.创建一个自己的module，它只包含一个block。然后在block中添加代码对product collection进行筛选。当然也可以直接将这个block放到catalog模块的相应目录下，把模板放到相关的主题目录模板下。

$products   = $product->setStoreId($storeId)->getCollection()
            ->addAttributeToFilter('show_on_homepage', array('yes'=>true))

显然，上面的方面必须是在用户末添加产品时就得做，万一用户已经添加完很多产品什么办？还是有办法的。因为product list block可以显示某一类的产品，所以我们如果不想修改代码，可以设置一个新的子类，注意不要将它设置为active（除非你想在首页的菜单中看到这个类）。然后将这个子类的id传递给product list block，之后，就让用户选择他要放在首页的产品了，并把这些产品指定到这个类下面，这可是利用了magento 的一个产品可以指定给多个分类的特点。
#T=取本机地址
<?php echo $this->getUrl('') ?>
#T=输入文字 可改变 注意之前要用span或inline字符
<?php echo $this->__('^!'); ?>
#T=系统的设计会误导一些人
系统的设计会误导一些人
#T=显示sku
<?php echo $this->htmlEscape($_product->getSku()) ?> 
#T=修改checkout的统计页面 tax/checkout/grandtotal.phtml
修改checkout的统计页面 tax/checkout/grandtotal.phtml
#T=修改navi结构
mage/catelog/block/navigation
#T=重设toolbar模板<?php echo $this->getToolbarBlock()->setTemplate('catalog/product/list/toolbar.phtml')->toHtml(); ?>
<?php echo $this->getToolbarBlock()->setTemplate('catalog/product/list/toolbar.phtml')->toHtml(); ?>
#T=cms完全干净页面
<reference name="root">
   <action method="setTemplate"><template>page/cms-empty.phtml</template></action>
</reference>
<reference name="content">
            <action method="unsetChild">
                <alias>cms.wrapper</alias>
            </action>
            <block type="cms/page" name="cms_page"/>
</reference>
#T={{config path="web/secure/base_url"}}index.php/valentine
{{config path="web/secure/base_url"}}index.php/valentine
#T=<?=Mage::getUrl('520biz'); ?>
<?=Mage::getUrl('520biz'); ?>
#T=重设模板 <?php echo $this->getChild('product_list_toolbar_pager')->setTemplate('page/html/pager1.phtml')->toHtml(); ?>
<?php echo $this->getChild('product_list_toolbar_pager')->setTemplate('page/html/pager1.phtml')->toHtml(); ?>
#